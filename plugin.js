import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default ({ app, store }) => {
  const { commit, getters } = store;
  commit('<%=options.storeSetLocales%>', <%=JSON.stringify(options.locales)%>);
  app.i18n = new VueI18n({
    locale: getters['<%=options.getCurrentLocale%>'],
    fallbackLocale: '<%=options.fallbackLocale%>',
    messages: {
    <% options.messages.forEach(({locale, messages}) => { %>
      '<%=locale%>': <%=JSON.stringify(messages)%>,
    <% }) %>
    },
  });
};
