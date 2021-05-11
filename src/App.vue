<template>
    <div class="app">
        <router-view v-if="isRouterAlice"></router-view>
    </div>
</template>

<script>
export default {
    name:'App',
    provide(){
        return{
            reload:this.reload
        }
    },
    data(){
        return{
            isRouterAlice:true
        }
    },
    methods:{
        reload(){
            this.isRouterAlice = false;
            this.$nextTick(function (){
                this.isRouterAlice = true;
            })
        }
    }
}
</script>

<style>
html,body{
  margin:0;
  padding:0;
}
.app{

}
</style>
