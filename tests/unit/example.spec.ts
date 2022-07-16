import { shallowMount } from "@vue/test-utils";
import NavBar from "@/components/NavBar.vue";

describe("TopBar.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "Home | About";
    const wrapper = shallowMount(NavBar);
    expect(wrapper.text()).toMatch(msg);
  });
});
