<template>
  <div
    role="MaterialColorPicker"
    class="vc-material"
  >
    <EditableInput
      class="vc-material-hex"
      label="hex"
      :style="{ borderColor: hex }"
      :value="hex"
      @change="onChangeHex"
    />

    <div class="vc-material-split">
      <div class="vc-material-third">
        <EditableInput
          label="r"
          :value="rgba && rgba.r"
          @change="onChange('r', $event)"
        />
      </div>
      <div class="vc-material-third">
        <EditableInput
          label="g"
          :value="rgba && rgba.g"
          @change="onChange('g', $event)"
        />
      </div>
      <div class="vc-material-third">
        <EditableInput
          label="b"
          :value="rgba && rgba.b"
          @change="onChange('b', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import EditableInput from './common/EditableInput.vue';
import { mixins } from 'vue-class-component';
import { Component } from 'vue-property-decorator';
import Color from '../common/ColorMixin';
import { isValidHex } from '../utils';

@Component({
  components: { EditableInput }
})
export default class Material extends mixins(Color) {
  get hex () {
    if (this.isInputEmpty) {
      return null;
    }
    return this.tc.toHexString();
  }

  get rgba () {
    if (this.isInputEmpty) {
      return null;
    }
    return this.tc.toRgb();
  }

  onChangeHex (hex: string) {
    if (isValidHex(hex) && hex.length === 7) {
      this.onColorChange(hex);
    }
  }

  onChange (label: 'r' | 'g' | 'b', data: number) {
    if (this.rgba === null) {
      return;
    }
    this.onColorChange({ ...this.rgba, ...{ [label]: data } });
  }
}
</script>

<style>
.vc-material {
  width: 98px;
  height: 98px;
  padding: 16px;
  font-family: "Roboto";
  position: relative;
  border-radius: 2px;
  box-shadow: 0 2px 10px rgba(0,0,0,.12), 0 2px 5px rgba(0,0,0,.16);
  background-color: #fff;
}

.vc-material .vc-input__input {
  width: 100%;
  margin-top: 12px;
  font-size: 15px;
  color: #333;
  height: 30px;
}

.vc-material .vc-input__label {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 11px;
  color: #999;
  text-transform: capitalize;
}

.vc-material-hex {
  border-bottom-width: 2px;
  border-bottom-style: solid;
}
.vc-material-split {
  display: flex;
  margin-right: -10px;
  padding-top: 11px;
}
.vc-material-third {
  flex: 1;
  padding-right: 10px;
}
</style>
