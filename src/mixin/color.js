import tinycolor from 'tinycolor2'

export default {
  methods: {
    colorChange (data, type) {
      console.log(data, type)
      
      if(type === 'hex'){
        if(!this.isValidHex(data)){
          return
        }
      }

      if(type === 'hex'){
        var c = tinycolor(data)
        this.hsl = c.toHsl()
        // this.hex = c.toString()
        this.rgba = c.toRgb()
      }


    },
    isValidHex (hex) {
      return tinycolor(hex).isValid()
    }
  }
}