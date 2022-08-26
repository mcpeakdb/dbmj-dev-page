import EasyClockComponent from "../components/widgets/EasyClock.vue";
import EasyClockDocs from "./docs/EasyClock.docs.mdx";

export default {
  title: "Components/Widgets/EasyClock",
  component: EasyClockComponent,
  parameters: {
    docs: {
      page: EasyClockDocs,
    },
  },
};

const Template = () => ({
  components: { EasyClockComponent },
  template: "<easy-clock-component />",
});

export const EasyClock = Template.bind({});
