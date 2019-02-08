describe("feed", () => {
  it("gives hamsters their feed", done => {
    request
      .get("/v1/feed")
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.body.data.items).to.be.an("array")
        expect(res.body.data.totalItems).to.be.an("number")
        done()
      })
  })
})
