const firebaseConfig = {
    apiKey: "AIzaSyAr-plv7MsXQSfVNMo7FNVmASrANgaz7jQ",
    authDomain: "craftingrealmz.firebaseapp.com",
    databaseURL: "https://craftingrealmz-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "craftingrealmz",
    storageBucket: "craftingrealmz.appspot.com",
    messagingSenderId: "269529063141",
    appId: "1:269529063141:web:8a5fd9eaf46283770efe0c",
    measurementId: "G-T1PFHL6SBG"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const perf = firebase.performance(firebaseApp);
  
  const app = Vue.createApp({
    data() {
        return {
            loading: true,
            error: null,
            players: null,
            ip: null,
            version: null,
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