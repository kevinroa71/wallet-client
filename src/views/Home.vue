<template>
  <div class="home row justify-content-center">
    <div class="col-md-8 col-lg-4">
      <Saldo/>
      <br>
      <Recargar/>
      <br>
    </div>
    <div class="col-md-12 col-lg-8">
      <Pagar/>
    </div>
  </div>
</template>

<script>
import Saldo from '../components/Saldo';
import Recargar from '../components/Recargar';
import Pagar from '../components/Pagar';

export default {
  name: 'Home',
  components: {
    Saldo,
    Recargar,
    Pagar
  }
}
</script>
