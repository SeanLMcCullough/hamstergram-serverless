describe("me", () => {
  it("returns the principal", done => {
    request
      .get("/v1/me")
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.body.data).to.be.an('object')
        expect(res.body.data).to.have.a.property('_id').that.is.an("string")
        expect(res.body.data).to.have.a.property('displayName').that.is.an("string")
        done()
      })

  })
})
