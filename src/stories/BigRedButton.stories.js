import BigRedButtonComponent from "../components/widgets/BigRedButton/BigRedButton.vue";
import BigRedButtonDocs from "./docs/BigRedButton.docs.mdx";

export default {
  title: "Components/Widgets/Big Red Button/Example",
  component: BigRedButtonComponent,
  parameters: {
    docs: {
      page: BigRedButtonDocs,
    },
  },
};

const Template = () => ({
  components: { BigRedButtonComponent },
  template: "<big-red-button-component @submit='submit'/>",
  methods: {
    submit() {
      alert("you pressed the button!");
    },
  },
});

export const Example = Template.bind({});
