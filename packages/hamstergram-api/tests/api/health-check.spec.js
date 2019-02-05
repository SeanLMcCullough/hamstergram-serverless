describe("healthcheck", () => {
  it("responds to healthcheck", done => {
    request
      .get("/")
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.body.healthy).to.equal(true)
        done()
      })

  })
})
