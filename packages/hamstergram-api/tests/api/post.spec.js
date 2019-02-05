describe("post", () => {
  it("stores a post", done => {
    request
      .put("/v1/post")
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        text: "Hello, Hamsters!"
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        expect(res.body).to.be.an("object")
        expect(res.body.id).to.be.an("string").that.is.not.empty
        expect(res.body.text).to.equal("Hello, Hamsters!")
        expect(res.body.createdAt).to.be.an("string").that.is.not.empty
        expect(res.body.updatedAt).to.be.an("string").that.is.not.empty
        done()
      })
  })

  it("likes a post", done => {
    request
      .put("/v1/post")
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        text: "Hello, Hamsters!"
      })
      .end((err, res) => {
        request
          .post(`/v1/post/${res.body.id}/like`)
          .set('Accept', 'application/json')
          .expect(200)
          .expect('Content-Type', /json/, done)
      })
  })
})
