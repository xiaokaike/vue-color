import EditableInput from '../../src/components/common/EditableInput';

export default {
  title: 'Common/EditableInput',
};

const Input = (label) => ({
  components: { EditableInput },
  data() {
    return {
      value: 100
    }
  },
  methods: {
    handleChange(value) {
      console.log(`EditableInput ${label.toUpperCase()} changed ===> `, value);
    }
  },
  template: `<EditableInput label="${label}" v-model="value" @change="handleChange" />`
})

export const R = () => Input('r');
R.story = {
  name: 'R',
};

export const G = () => Input('g');
G.story = {
  name: 'G',
};

export const B = () => Input('b');
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

export const H = () => Input('h');
H.story = {
  name: 'H',
};

export const S = () => Input('s');
S.story = {
  name: 'S',
};

export const L = () => Input('l');
L.story = {
  name: 'L',
};

export const V = () => Input('v');
V.story = {
  name: 'V',
};

export const Hex = () => (
  {
    components: { EditableInput },
    data() {
      return {
        value: '#ffffff'
      }
    },
    methods: {
      handleChange(value) {
        console.log(`EditableInput changed ===>`, value);
      }
    },
    template: `<EditableInput v-model="value" @change="handleChange" />`
  }
);
Hex.story = {
  name: 'Hex',
};