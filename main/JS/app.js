const app = Vue.createApp({
    data() {
        return {
            loading: true,
            error: null,
            players: null,
            ip: null,
            version: null
        };
    },
    mounted() {
        fetch("https://api.mcstatus.io/v2/status/java/play.craftingrealm.tk")
            .then(response => response.json())
            .then(data => {
                this.loading = false;
                if (data.online) {
                    this.players = data.players.online;
                    this.ip = data.host;
                    this.version = data.version;
                } else {
                    this.error = "The server is offline.";
                }
            })
            .catch(error => {
                this.loading = false;
                this.error = "An error occurred while fetching the server status.";
            });
    }
});

app.mount("#app");