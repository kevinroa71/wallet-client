<template>
    <div class="card col">
        <div class="card-body">
            <h2 class="card-title">
                <i class="fas fa-coins"></i> Saldo
                <span class="badge badge-info float-right"><i class="fas fa-dollar-sign"></i> {{saldo}}</span>
            </h2>
        </div>
    </div>
</template>

<script>
import Api from "../services/api";

export default {
    name: 'Saldo',
    computed: {
        saldo: function() {
            return Math.ceil(this.$store.getters.getSaldo*100)/100;
        }
    },
    mounted: function() {
        let wallet = this.$store.getters.getWallet;
        Api.get('/consultar', {
            params: {
                documento: wallet.documento,
                celular: wallet.celular
            }
        })
        .then(resp => {
            this.$store.commit('setSaldo', resp.data.data.saldo);
        })
        .catch(() => {});
    }
}
</script>

<style>

</style>