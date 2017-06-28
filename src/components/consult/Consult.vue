<template>
  <div>
    consult: {{ userName }}
    <table>
      <template v-for="item in consultList">
        <tr v-if="item.IsDoctorReply == 0">
          <td>
            <img :src="item.PhotoUrl" style="width:32px;height:32px;">
            <label>{{item.CommitOn}}</label>
          </td>
          <td>
            <div v-html="item.Content"></div>
          </td>
          <td></td>
        </tr>
        <tr v-if="item.IsDoctorReply == 1">
          <td>
          </td>
          <td>
            <div v-html="item.Content"></div>
          </td>
          <td>
            <img :src="item.PhotoUrl" style="width:32px;height:32px;">
            <label>{{item.CommitOn}}</label>
          </td>
        </tr>
      </template>
    </table>
    <button @click="onClickA">aaa</button>
  </div>
</template>

<script>
import { consultService as service } from '@/services'

export default {
  name: 'consult',
  data() {
    const { userName } = this.$caches.user
    return {
      userName,
      consultList: []
    }
  },
  mounted () {
    var self = this
    service.ConsultRecords({ customId: 1703133, lastId: 4 })
      .then(function (json) {
        console.log(json)
        self.consultList = json
      })
      .catch(function (error) {
        console.log('error:', error)
      })
  },
  methods: {
    onClickA() {
      console.log(this.$caches)
    }
  }
}
</script>

