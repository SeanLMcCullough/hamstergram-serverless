describe("healthcheck", () => {
  it("responds to healthcheck", done => {
    request
      .get("/")
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.body.data.healthy).to.equal(true)
        done()
      })

  })
})
