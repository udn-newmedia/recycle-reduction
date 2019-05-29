<template>
  <div class="map">
    <div ref="map" class="map__container"></div>
  </div>
</template>

<script>
import gmapsInit from '@/assets/scripts/gmaps-init'
import mapStyles from '@/assets/scripts/gmaps-styles.json'

export default {
  name: 'Map',
  components: {},
  props: {
    bento: { type: Array, default: () => [] },
    ga: {type: String, default: ''}
  },
  data () {
    return {
      map: null,
      infoWindow: null,
      markers: []
    }
  },
  computed: {
  },
  methods: {
  },
  mounted () {
    let vm = this
    gmapsInit().then(google => {
      let { lat, lng } = this.bento[0]
      this.map = new google.maps.Map(this.$refs.map, {
        center: { lat, lng },
        zoom: 10,
        styles: mapStyles
      })
      this.infoWindow = new google.maps.InfoWindow()
      this.markers = this.bento.map(store => {
        let { name, lat, lng } = store
        let position = { lat, lng }
        let title = name
        let map = this.map
        let infoWindow = this.infoWindow
        return new google.maps.Marker({
          position,
          title,
          map,
          store,
          infoWindow
        })
      })
      this.markers.forEach((marker, index)=> {
        marker.addListener('click', function () {
          let { store, infoWindow } = this
          let { name, phones, address, preorderTime, preorderNumbers, deliverable } = store
          let content = `
            ${name}<br/>
            電話: ${phones.join('，')}<br/>
            地址: ${address}<br/>
            預定時間: ${preorderTime}<br/>
            最低訂購: ${preorderNumbers}<br/>
          `
          if (deliverable) {
            content += '可以外送<br/>'
          }
          infoWindow.setContent(content)
          infoWindow.setPosition(this.position)
          infoWindow.open(this.map, this)
          //GA
          if(vm.ga=='Taipei') {
            ga('newmedia.send', {
              hitType: 'event',
              eventCategory: '雙北地圖',
              eventAction: 'click',
              eventLabel: `${index}`,
            });
          }else if(vm.ga=='Taichung') {
            ga('newmedia.send', {
              hitType: 'event',
              eventCategory: '台中地圖',
              eventAction: 'click',
              eventLabel: `${index}`,
            });
          }
          //GA
        })
      })
    })
  }
}
</script>

<style lang="scss">
.map {
  position: relative;
  color: black;
  @include use-fixed-ratio(16, 9);

  &__container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
