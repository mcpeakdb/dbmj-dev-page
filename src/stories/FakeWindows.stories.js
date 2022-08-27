import FakeWindowsComponent from "../components/widgets/FakeWindows/FakeWindows.vue";
import FakeWindowsDocs from "./docs/FakeWindows.docs.mdx";

export default {
  title: "Components/Widgets/Fake Windows/Example",
  component: FakeWindowsComponent,
  parameters: {
    docs: {
      page: FakeWindowsDocs,
    },
  },
};

const Template = () => ({
  components: { FakeWindowsComponent },
  template: "<fake-windows-component style='height:100vh'/>",
});

export const Example = Template.bind({});
