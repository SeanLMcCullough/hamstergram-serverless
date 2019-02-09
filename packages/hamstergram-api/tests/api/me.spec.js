describe("me", () => {
  it("returns the principal", done => {
    request
      .get("/v1/me")
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.body.data).to.be.an('object')
        expect(res.body.data).to.have.a.property('_id').that.is.an("string").to.not.be.empty
        expect(res.body.data).to.have.a.property('displayName').that.is.an("string")
        done()
      })

  })

  it("returns the same user each time", done => {
    request
      .get("/v1/me")
      .set('Accept', 'application/json')
      .end((err, res) => {
        let first = res.body.data._id
        request
          .get("/v1/me")
          .set('Accept', 'application/json')
          .end((err, res) => {
            expect(res.body.data._id).to.equal(first)
            done()
          })
      })
  })
})
