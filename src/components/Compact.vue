<template>
  <div class="c-compact">
    <ul class="colors">
      <li class="color-item" v-for="c in colors" 
        @click="handlerClick(c)"
        :class="{white: c === '#FFFFFF' }"
        :style="{background: c}">
        <div class="dot" v-show="c === dot"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import colorMixin from '../mixin/color'

var colors = [
  '#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00',
  '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF',
  '#333333', '#808080', '#cccccc', '#D33115', '#E27300', '#FCC400',
  '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF',
  '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00',
  '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E',
]

export default {
  name: 'Compact',
  mixins: [colorMixin],
  props: {
    hex: String,
    rgba: Object,
    hsl: Object,
  },
  data () {
    return {
      colors: colors,
      dot: ''
    }
  },
  methods: {
    handlerClick (c) {
      this.dot = c
    }
  }

}
</script>

<style>
.c-compact {
  padding-top: 5px;
  padding-left: 5px;
  width: 240px;
  border-radius: 2px;
  box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);
}
.c-compact .colors {
  overflow: hidden;
  padding: 0;
  margin: 0;
}

.c-compact .color-item{
  list-style: none;
  width: 15px;
  height: 15px;
  float: left;
  margin-right: 5px;
  margin-bottom: 5px;
  position: relative;
  cursor: pointer;
  
}
.c-compact .color-item.white {
  box-shadow: inset 0 0 0 1px #ddd;
}
.dot{
  position: absolute;
  top: 5px;
  right: 5px;
  bottom: 5px;
  left: 5px;
  border-radius: 50%;
  opacity: 1;
  background: #fff;
}

.c-compact .color-item.white .dot{
  background: #000
}
</style>