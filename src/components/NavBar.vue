<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link to="/" class="nav-link"><i class="fas fa-tachometer-alt"></i> Tablero</router-link>
                </li>
                <li class="nav-item" v-if="!hasWallet">
                    <router-link to="/registro" class="nav-link"><i class="fas fa-wallet"></i> Crear Billetera</router-link>
                </li>
            </ul>
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
