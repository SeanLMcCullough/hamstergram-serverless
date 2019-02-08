describe("feed", () => {
  it("gives hamsters their feed", done => {
    request
      .get("/v1/feed")
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.body.data).to.be.an("array")
        res.body.data.forEach(o => {
          expect(o).to.be.an("Object")
          expect(o.likes).to.be.an("Array")
        })
        done()
      })
  })

  it("paginates", done => {
    request
      .get("/v1/feed?page-size=2")
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body.data.length).to.be.below(3)
        request
          .get(`/v1/feed?page-size=1`)
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.body.data.length).to.be.below(2)
            done()
          })
      })
  })

  it("resumes from last id", done => {
    request
      .get("/v1/feed?page-size=1")
      .set('Accept', 'application/json')
      .end((err, res) => {
        const last = res.body.data.pop()._id
        request
          .get(`/v1/feed?page-size=1&last-id=${last}`)
          .set('Accept', 'application/json')
          .end((err, res) => {
            const current = res.body.data.pop()._id
            expect(current).to.not.equal(last)
            done()
          })
      })
  })

  it("returns 10 posts by default", done => {
    request
      .get("/v1/feed")
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.body.data).to.have.lengthOf.below(11)
        done()
      })
  })
})
