import ButtonScrewComponent from "../components/widgets/BigRedButton/ButtonScrew.vue";
import ButtonScrewDocs from "./docs/ButtonScrew.docs.mdx";

export default {
  title: "Components/Widgets/Big Red Button/Button Screw",
  component: ButtonScrewComponent,
  parameters: {
    docs: {
      page: ButtonScrewDocs,
    },
  },
};

const Template = () => ({
  components: { ButtonScrewComponent },
  template: "<button-screw-component @unscrew='unscrew'/>",
  methods: {
    unscrew() {
      alert("oh no, you lost the screw!");
    },
  },
});

export const ButtonScrew = Template.bind({});
