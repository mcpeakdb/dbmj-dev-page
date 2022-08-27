<template>
  <div class="step-content step-one-content animate-screen-on">
    <div>
      <h1>Hello world,</h1>
      <h2>Welcome to my sandbox of web development!</h2>
      <h3>
        Press 1 to Start Over. Press 2 to skip to the end. <br />Press any other
        key to continue...<span v-if="!keyPressed" class="cursor">&nbsp;</span>
      </h3>
      <div v-if="keyPressed">{{ keyPressed }}</div>
      <br />
      <div class="typewriter" v-if="keyPressed === '1'">
        Starting over...<span class="cursor">&nbsp;</span>
      </div>
      <div class="typewriter" v-else-if="keyPressed === '2'">
        Loading the end..<span class="cursor">&nbsp;</span>
      </div>
      <div class="typewriter" v-else-if="keyPressed">
        Loading...<span class="cursor">&nbsp;</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.step-one-content {
  color: $terminalGreen;
  background: $black;
  font-family: Terminal;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  word-break: break-word;

  &::before {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 18px;
    right: 0;
    background: linear-gradient(
        rgba(18, 16, 16, 0) 50%,
        rgba(0, 0, 0, 0.25) 50%
      ),
      linear-gradient(
        90deg,
        rgba(255, 0, 0, 0.06),
        rgba(0, 255, 0, 0.02),
        rgba(0, 0, 255, 0.06)
      );
    z-index: 2;
    background-size: 100% 2px, 3px 100%;
    pointer-events: none;
    animation: flicker 0.15s infinite;
  }

  .cursor {
    animation: cursor-blink 1s linear infinite;
  }

  .typewriter {
    overflow: hidden;
    margin: 0 auto;
    animation: typing 3.5s steps(40, end);
    padding-bottom: 2rem;
  }
}

@keyframes cursor-blink {
  from {
    background-color: $terminalGreen;
  }

  to {
    background-color: transpraent;
  }
}

@keyframes flicker {
  0% {
    opacity: 0.27861;
  }
  5% {
    opacity: 0.34769;
  }
  10% {
    opacity: 0.23604;
  }
  15% {
    opacity: 0.90626;
  }
  20% {
    opacity: 0.18128;
  }
  25% {
    opacity: 0.83891;
  }
  30% {
    opacity: 0.65583;
  }
  35% {
    opacity: 0.67807;
  }
  40% {
    opacity: 0.26559;
  }
  45% {
    opacity: 0.84693;
  }
  50% {
    opacity: 0.96019;
  }
  55% {
    opacity: 0.08594;
  }
  60% {
    opacity: 0.20313;
  }
  65% {
    opacity: 0.71988;
  }
  70% {
    opacity: 0.53455;
  }
  75% {
    opacity: 0.37288;
  }
  80% {
    opacity: 0.71428;
  }
  85% {
    opacity: 0.70419;
  }
  90% {
    opacity: 0.7003;
  }
  95% {
    opacity: 0.36108;
  }
  100% {
    opacity: 0.24387;
  }
}

@keyframes typing {
  0% {
    width: 0;
    white-space: nowrap;
  }
  100% {
    width: 100%;
    white-space: normal;
  }
}
</style>

<script lang="ts">
import router from "@/router";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "StepOne",
  setup(props, { emit }) {
    const submit = (key: string): void => {
      if (keyPressed.value) {
        return;
      }
      keyPressed.value = key;

      window.scrollTo(0, document.body.scrollHeight);

      setTimeout(() => {
        if (key === "1") {
          router.push("/?step=0");
          document.body.style.backgroundColor = "white";
        } else if (key === "2") {
          router.push("/?step=" + props.finalStep);
        } else {
          emit("submit");
        }

        keyPressed.value = "";
      }, 4000);
    };

    const keyupSubmit = (e: KeyboardEvent): void => {
      submit(e.key);
    };

    const mouseupSubmit = (): void => {
      submit("MouseClick");
    };

    window.addEventListener("keyup", keyupSubmit);
    window.addEventListener("mouseup", mouseupSubmit);

    const keyPressed = ref<string>("");

    return {
      keyPressed,
    };
  },
  props: {
    finalStep: {
      type: Number,
      default: 0,
    },
  },
  emits: ["submit"],
});
</script>
