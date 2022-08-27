import EasyClockComponent from "../components/widgets/EasyClock.vue";
import EasyClockDocs from "./docs/EasyClock.docs.mdx";

export default {
  title: "Components/Widgets/Easy Clock",
  component: EasyClockComponent,
  parameters: {
    docs: {
      page: EasyClockDocs,
    },
  },
};

const Template = () => ({
  components: { EasyClockComponent },
  template:
    "<div style='color:black;background-color:lightgrey;padding:1rem;width:fit-content'><easy-clock-component /></div>",
});

export const EasyClock = Template.bind({});
