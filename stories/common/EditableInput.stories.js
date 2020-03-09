import EditableInput from '../../src/components/common/EditableInput';

export default {
  title: 'Common/EditableInput',
};

const Input = (label, value) => ({
  components: { EditableInput },
  data() {
    return {
      value
    }
  },
  methods: {
    handleChange(value) {
      console.log(`EditableInput ${label.toUpperCase()} changed ===> `, value);
    }
  },
  template: `<EditableInput label="${label}" v-model="value" @change="handleChange" />`
})

export const R = () => Input('r', 100);
R.story = {
  name: 'R',
};

export const G = () => Input('g', 100);
G.story = {
  name: 'G',
};

export const B = () => Input('b', 100);
B.story = {
  name: 'B',
};

export const A = () => (
  {
    components: { EditableInput },
    data() {
      return {
        value: 0.5
      }
    },
    methods: {
      handleChange(value) {
        console.log(`EditableInput A changed ===> `, value);
      }
    },
    template: `<EditableInput label="a" v-model="value" @change="handleChange" :step="0.1" />`
  }
);
A.story = {
  name: 'A',
};

export const H = () => Input('h', 360);
H.story = {
  name: 'H',
};

export const S = () => Input('s', 100);
S.story = {
  name: 'S',
};

export const L = () => Input('l', 100);
L.story = {
  name: 'L',
};

export const V = () => Input('v', 100);
V.story = {
  name: 'V',
};

export const Hex = () => Input('hex', '#ffffff');;
Hex.story = {
  name: 'Hex',
};

export const WithoutDefaultValue = () => Input('r', null);;
Hex.story = {
  name: 'Hex',
};