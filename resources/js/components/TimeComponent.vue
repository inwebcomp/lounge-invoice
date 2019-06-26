<template>
   <span> {{ timeCom }} </span>
</template>

<script>

export default {
   name: 'TimeComponent',

   data: () => ({
      time: null
   }),

   methods: {
      getFiled(field) {
         return this.$store.state.invoiceInfo[field]
      }
   },

   computed: {
      timeCom() {
         return this.getFiled('time') ? this.getFiled('time') : this.time
      }
   },

   mounted() {
      const intrId = setInterval(() => {
         const options = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
         }
         const time = new Intl.DateTimeFormat('ru-RU', options).format(new Date())

         this.time = time;
      }, 1000)
   }
}
</script>
