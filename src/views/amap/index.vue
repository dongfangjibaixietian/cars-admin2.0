<template>
<div class="amap-wrap">
    <el-amap vid="amapContainer" :events="events" class="amap-demo"></el-amap>
    </div>
</template>

<script>
import { AMapManager, lazyAMapApiLoaderInstance } from 'vue-amap';
import { getLngLag } from "./common";
import { addressSetMapCenter } from "./location";
export default {
    name : "amap",
    data(){
        return {
            map: null,
            zoom: 18,
            events: {}
        }
    },
    mounted(){
        lazyAMapApiLoaderInstance.load().then(() => {
            // your code ...
            this.map = new AMap.Map('amapContainer', {
                center: [116.404765, 39.918052],
                zoom: this.zoom, //初始化地图层级
            });
            this.map.on("cilck", (e) => {
                console.log("12");
                const lonlag =  getLngLag(e);
                this.$emit("lonlag", lonlag)

            })
        });
    },
    methods: {
        setCenter(value) {
            console.log(111);
            addressSetMapCenter(value, this.map);
        }
    }
}
</script>

<style scoped>
.amap-wrap {
    height: 100%;
}
</style>