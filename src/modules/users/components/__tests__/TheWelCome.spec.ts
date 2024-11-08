import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import TheWelcome from "../TheWelcome.vue";
import WelcomeItem from "../WelcomeItem.vue";
import DocumentationIcon from "../icons/IconDocumentation.vue";
import ToolingIcon from "../icons/IconTooling.vue";
import EcosystemIcon from "../icons/IconEcosystem.vue";
import CommunityIcon from "../icons/IconCommunity.vue";
import SupportIcon from "../icons/IconSupport.vue";

describe("TheWelcome", () => {
  const theWelComeWrapper = mount(TheWelcome);

  it("should render correctly", () => {
    expect(theWelComeWrapper.exists()).toBe(true);
  });

  it("should contain 5 welcome items", () => {
    expect(theWelComeWrapper.findAllComponents(WelcomeItem).length).toBe(5);
  });

  it("should contain the documentation item", () => {
    const documentationItem = theWelComeWrapper.findComponent(WelcomeItem);
    expect(documentationItem.exists()).toBe(true);

    expect(documentationItem.findComponent(DocumentationIcon).exists())
      .toBe(true);
    expect(documentationItem.find("[data-test='heading']").text()).toBe("Documentation");

    const documentationLink = documentationItem.find("a");
    expect(documentationLink.exists()).toBe(true);

    expect(documentationLink.attributes().href).toBe("https://vuejs.org/");
    expect(documentationLink.attributes().target).toBe("_blank");
    expect(documentationLink.text()).toBe("official documentation");

    expect(documentationItem.text()).toContain("Vue’s");
    expect(documentationItem.text()).toContain("provides you with all information you need to get started.");
  });

  it("should contain the tooling item", () => {
    const toolingItem = theWelComeWrapper.findAllComponents(WelcomeItem)[1];
    expect(toolingItem.exists()).toBe(true);

    expect(toolingItem.findComponent(ToolingIcon).exists())
      .toBe(true);
    expect(toolingItem.find("[data-test='heading']").text()).toBe("Tooling");

    const viteGuideLink = toolingItem.find("[data-test='vite-guide']");
    expect(viteGuideLink.exists()).toBe(true);
    expect(viteGuideLink.attributes().href).toBe("https://vitejs.dev/guide/features.html");
    expect(viteGuideLink.attributes().target).toBe("_blank");
    expect(viteGuideLink.text()).toBe("Vite");

    const vscodeLink = toolingItem.find("[data-test='vscode']");
    expect(vscodeLink.exists()).toBe(true);
    expect(vscodeLink.attributes().href).toBe("https://code.visualstudio.com/");
    expect(vscodeLink.attributes().target).toBe("_blank");
    expect(vscodeLink.text()).toBe("VSCode");

    const volarLink = toolingItem.find("[data-test='volar']");
    expect(volarLink.exists()).toBe(true);
    expect(volarLink.attributes().href).toBe("https://github.com/johnsoncodehk/volar");
    expect(volarLink.attributes().target).toBe("_blank");
    expect(volarLink.text()).toBe("Volar");

    const cypressLink = toolingItem.find("[data-test='cypress']");
    expect(cypressLink.exists()).toBe(true);
    expect(cypressLink.attributes().href).toBe("https://www.cypress.io/");
    expect(cypressLink.attributes().target).toBe("_blank");
    expect(cypressLink.text()).toBe("Cypress");

    const cypressComponentLink = toolingItem.find("[data-test='cypress-component']");
    expect(cypressComponentLink.exists()).toBe(true);
    expect(cypressComponentLink.attributes().href).toBe("https://on.cypress.io/component");
    expect(cypressComponentLink.attributes().target).toBe("_blank");
    expect(cypressComponentLink.text()).toBe("Cypress Component Testing");

    expect(toolingItem.text()).toContain("This project is served and bundled with");
    expect(toolingItem.text()).toContain("The recommended IDE setup is");
    expect(toolingItem.text()).toContain("If you need to test your components and web pages, check out");
    expect(toolingItem.text()).toContain("More instructions are available in README.md");
    expect(toolingItem.text()).toContain("+");
    expect(toolingItem.text()).toContain("and");
  });

  it("should contain the ecosystem item", () => {
    const ecosystemItem = theWelComeWrapper.findAllComponents(WelcomeItem)[2];
    expect(ecosystemItem.exists()).toBe(true);

    expect(ecosystemItem.findComponent(EcosystemIcon).exists())
      .toBe(true);
    expect(ecosystemItem.find("[data-test='heading']").text()).toBe("Ecosystem");

    const piniaLink = ecosystemItem.find("[data-test='pinia']");
    expect(piniaLink.exists()).toBe(true);
    expect(piniaLink.attributes().href).toBe("https://pinia.vuejs.org/");
    expect(piniaLink.attributes().target).toBe("_blank");
    expect(piniaLink.text()).toBe("Pinia");

    const vueRouterLink = ecosystemItem.find("[data-test='vue-router']");
    expect(vueRouterLink.exists()).toBe(true);
    expect(vueRouterLink.attributes().href).toBe("https://router.vuejs.org/");
    expect(vueRouterLink.attributes().target).toBe("_blank");
    expect(vueRouterLink.text()).toBe("Vue Router");

    const vueTestUtilsLink = ecosystemItem.find("[data-test='vue-test-utils']");
    expect(vueTestUtilsLink.exists()).toBe(true);
    expect(vueTestUtilsLink.attributes().href).toBe("https://test-utils.vuejs.org/");
    expect(vueTestUtilsLink.attributes().target).toBe("_blank");
    expect(vueTestUtilsLink.text()).toBe("Vue Test Utils");

    const devtoolsLink = ecosystemItem.find("[data-test='devtools']");
    expect(devtoolsLink.exists()).toBe(true);
    expect(devtoolsLink.attributes().href).toBe("https://github.com/vuejs/devtools");
    expect(devtoolsLink.attributes().target).toBe("_blank");
    expect(devtoolsLink.text()).toBe("Vue Dev Tools");

    const awesomeVueLink = ecosystemItem.find("[data-test='awesome-vue']");
    expect(awesomeVueLink.exists()).toBe(true);
    expect(awesomeVueLink.attributes().href).toBe("https://github.com/vuejs/awesome-vue");
    expect(awesomeVueLink.attributes().target).toBe("_blank");
    expect(awesomeVueLink.text()).toBe("Awesome Vue");

    expect(ecosystemItem.text()).toContain("Get official tools and libraries for your project:");
    expect(ecosystemItem.text()).toContain(", and");
    expect(ecosystemItem.text()).toContain(". If you need more resources, we suggest paying");
    expect(ecosystemItem.text()).toContain("a visit.");
  });

  it("should contain the community item", () => {
    const communityItem = theWelComeWrapper.findAllComponents(WelcomeItem)[3];
    expect(communityItem.exists()).toBe(true);

    expect(communityItem.findComponent(CommunityIcon).exists())
      .toBe(true);
    expect(communityItem.find("[data-test='heading']").text()).toBe("Community");

    const vueLandLink = communityItem.find("[data-test='vue-land']");
    expect(vueLandLink.exists()).toBe(true);
    expect(vueLandLink.attributes().href).toBe("https://chat.vuejs.org");
    expect(vueLandLink.attributes().target).toBe("_blank");
    expect(vueLandLink.text()).toBe("Vue Land");

    const stackOverflowLink = communityItem.find("[data-test='stack-overflow']");
    expect(stackOverflowLink.exists()).toBe(true);
    expect(stackOverflowLink.attributes().href).toBe("https://stackoverflow.com/questions/tagged/vue.js");
    expect(stackOverflowLink.attributes().target).toBe("_blank");
    expect(stackOverflowLink.text()).toBe("StackOverflow");

    const mailingListLink = communityItem.find("[data-test='mailing-list']");
    expect(mailingListLink.exists()).toBe(true);
    expect(mailingListLink.attributes().href).toBe("https://news.vuejs.org");
    expect(mailingListLink.attributes().target).toBe("_blank");
    expect(mailingListLink.text()).toBe("our mailing list");

    const twitterVueLink = communityItem.find("[data-test='twitter-vue']");
    expect(twitterVueLink.exists()).toBe(true);
    expect(twitterVueLink.attributes().href).toBe("https://twitter.com/vuejs");
    expect(twitterVueLink.attributes().target).toBe("_blank");
    expect(twitterVueLink.text()).toBe("@vuejs");

    expect(communityItem.text()).toContain("Got stuck? Ask your question on");
    expect(communityItem.text()).toContain(", our official Discord server, or");
    expect(communityItem.text()).toContain(". You should also subscribe to");
    expect(communityItem.text()).toContain(" and follow the official");
    expect(communityItem.text()).toContain("twitter account for latest news in the Vue world.");
  });

  it("should contain the support item", () => {
    const supportItem = theWelComeWrapper.findAllComponents(WelcomeItem)[4];
    expect(supportItem.exists()).toBe(true);

    expect(supportItem.findComponent(SupportIcon).exists())
      .toBe(true);
    expect(supportItem.find("[data-test='heading']").text()).toBe("Support Vue");

    const sponsorLink = supportItem.find("[data-test='sponsor']");
    expect(sponsorLink.exists()).toBe(true);
    expect(sponsorLink.attributes().href).toBe("https://vuejs.org/sponsor/");
    expect(sponsorLink.attributes().target).toBe("_blank");
    expect(sponsorLink.text()).toBe("becoming a sponsor");

    expect(supportItem.text()).toContain("As an independent project, Vue relies on community backing for its sustainability. You can help us by");
  });
});
