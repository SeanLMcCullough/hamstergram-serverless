describe("feed", () => {
  it("gives hamsters their feed", done => {
    request
      .get("/v1/feed")
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.body.items).to.be.an("array")
        expect(res.body.totalItems).to.be.an("number")
        done()
      })
  })
})
