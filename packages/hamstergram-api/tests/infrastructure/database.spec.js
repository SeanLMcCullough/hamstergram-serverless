const db = require('src/infrastructure/database')({ config, logger })

describe("database", () => {

  it("instantiates mongoose", done => {
    expect(db.mongoose).to.be.an('Object')
    done()
  })

  it("loads models", done => {
    expect(db.models).to.be.an('Object')
    expect(db.models.Post).to.be.an('Function')
    expect(db.models.Like).to.be.an('Function')
    done()
  })

})
