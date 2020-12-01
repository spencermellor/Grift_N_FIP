// Needs included html code that is shown in portfolio.html or contact.html

const notification = new Vue({
    data: {
        title: '',
        info: '',
        timer: null
    },
    methods: {
        showNotification: function() {
            this.$el.classList.add('notification-active');

            this.timer = setTimeout(() => {
                this.$el.classList.remove('notification-active');
            }, 7000)
        },
        removeNotification: function() {
            this.$el.classList.remove('notification-active');
            this.$el.classList.remove('notification-error');
            this.$el.classList.remove('notification-success');
            clearTimeout(this.timer);
        },
    }
}).$mount('#notification')


export { notification };