const { clean } = require('src/domain/helpers')

describe("helpers.clean", () => {

  it("passes back a clean object", done => {
    expect(clean({ a: 1, b: 2 })).to.deep.equal({ a: 1, b: 2 })
    done()
  })

  it("removes null k:v pairs", done => {
    expect(clean({ a: 1, b: null })).to.deep.equal({ a: 1 })
    expect(clean({ a: null })).to.not.have.property('a')
    done()
  })

})
