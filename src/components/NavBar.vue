<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand">
                <img src="../assets/logo.png" width="30" height="30" alt="" loading="lazy">
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link"><i class="fas fa-tachometer-alt"></i> Tablero</router-link>
                    </li>
                    <li class="nav-item" v-if="!hasWallet">
                        <router-link to="/registro" class="nav-link"><i class="fas fa-wallet"></i> Crear Billetera</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
    computed: {
        hasWallet: function() {
            return !!this.$store.getters.getWallet;
        }
    }
}
</script>
