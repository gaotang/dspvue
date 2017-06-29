<template>
  <Tabs value="name1">
    <Tab-pane :label="label" name="name1">
      <table style="width:100%;">
        <tr>
          <td style="vertical-align: top; width:25%;">
            <div class="user-list" :style="{ height: customerHeight}">
              <template v-for="item in customerList">
                <Card @click.native="OnClickByCustomer(item)">
                  <Row class="user-avator-list">
                    <Col span="4">
                    <img :src="item.PhotoUrl">
                    </Col>
                    <Col span="20">
                    <Row>
                      <Col span="18">
                      <label>{{ item.Nickname }}({{ item.CustomerName }})</label>
                      </Col>
                      <Col span="6">
                      <Button type="dashed" size="small" :title="item.DeptName">{{ item.DeptName | subStr }}</Button>
                      </Col>
                      <Col span="24">
                      <label for="CommitOn">{{ item.CommitOn | clearT }}</label>
                      </Col>
                    </Row>
                    </Col>
                  </Row>
                </Card>
              </template>
            </div>
            <div style="margin: 10px 0;">
              <Page :total="customerCount" size="small" @on-change="OnChangeCustomers"></Page>
            </div>
          </td>
          <td style="vertical-align: top; width:45%;">
            <div class="user-list" :style="{ height: contentHeight }">
              <Card>
                <p class="userinfo">
                  <label for="username">{{ customer.CustomerName }}</label>
                  <label for="moblie">{{ customer.Mobile }}</label>
                  <label for="sex">{{ gender }}</label>
                  <label for="sex">{{ age }}</label>
                  <Button type="success" size="small" icon="ios-paperplane">转交</Button>
                </p>
              </Card>
              <template v-for="item in consultList">
                <Card v-if="item.IsDoctorReply == 0">
                  <p slot="title" class="user-avator">
                    <img :src="item.PhotoUrl">
                    <label>{{item.CommitOn | clearT }}</label>
                  </p>
                  <p class="user-content" v-html="item.Content"></p>
                </Card>
                <Card v-if="item.IsDoctorReply == 1">
                  <p slot="title" class="doctor-avator">
                    <label>{{item.CommitOn | clearT }}</label>
                    <img :src="item.PhotoUrl">
                  </p>
                  <p class="doctor-content" v-html="item.Content"></p>
                </Card>
              </template>
            </div>
          </td>
          <td style="vertical-alignalign: top; width:30%;">
            <div>
              <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 32,maxRows: 5}" placeholder="请输入您要发送的消息..."></Input>
              <div class="send-bar">
                <Button type="dashed" icon="cube">商品推送</Button>
                <Button type="dashed" icon="compose">问卷推送</Button>
                <Button type="dashed" icon="image">发送图片</Button>
                <Button type="dashed" icon="chatbox">发送短语</Button>
                <Button type="text" icon="arrow-down-b"></Button>
              </div>
              <Button type="primary" :loading="loading" icon="paper-airplane" @click="OnSendMessage" long>
                <span v-if="!loading">回复 (Ctrl+Enter)</span>
                <span v-else>发送中...</span>
              </Button>
            </div>
          </td>
        </tr>
      </table>
    </Tab-pane>
    <Tab-pane label="已处理" name="name2" icon="chatbubbles">已处理</Tab-pane>
    <Tab-pane label="转交问题" name="name3" icon="person-stalker">转交问题</Tab-pane>
  </Tabs>
</template>

<script>
import { consultService as service } from '@/services'

export default {
  name: 'consult',
  data() {
    return {
      customerHeight: '700px',
      contentHeight: '700px',
      label: (h) => {
        return h('div', [
          h('Icon', {
            props: {
              type: 'chatbubble-working'
            }
          }),
          h('span', '待处理'),
          h('Badge', {
            props: {
              count: 0
            }
          })
        ])
      },
      loading: false,
      customer: {
        CustomerName: '',
        Mobile: '',
        Birthday: '',
        Sex: ''
      },
      customerList: [],
      customerCount: 0,
      consultList: [],
      formItem: {
        textarea: ''
      }
    }
  },
  computed: {
    age() {
      if (this.customer.Birthday) {
        const [nowYear, birYear] = [new Date().getFullYear(), this.customer.Birthday.substring(0, 4)]
        return `${nowYear - birYear}岁`
      }
      return ''
    },
    gender() {
      if (this.customer.Sex === '1') return '男'
      if (this.customer.Sex === '0') return '女'
      return ''
    }
  },
  watch: {
    customerCount (val) {
      this.label = (h) => {
        return h('div', [
          h('Icon', {
            props: {
              type: 'chatbubble-working'
            }
          }),
          h('span', '待处理'),
          h('Badge', {
            props: {
              count: val
            }
          })
        ])
      }
    }
  },
  mounted() {
    let contentHeight = document.body.scrollHeight
    const [navHeight, subNavHeight, pageHeight, footerHeight, otherHeight] = [60, 50, 44, 78, 40]
    console.log(`contentHeight:${contentHeight - navHeight - subNavHeight - pageHeight - footerHeight - otherHeight}`)
    this.customerHeight = `${contentHeight - navHeight - subNavHeight - pageHeight - otherHeight}px`
    this.contentHeight = `${contentHeight - navHeight - subNavHeight - otherHeight}px`

    this.OnClickByGetCustomers()
  },
  // updated() {
  //   console.log('updated:')
  //   console.log(window.screen.availHeight)
  //   console.log(window.screen.height)
  //   console.log(document.body.offsetHeight)
  //   console.log(document.body.clientHeight)
  //   console.log(document.body.scrollHeight)
  // },
  methods: {
    OnClickByGetCustomers(skip = 0, take = 10, flag = 3) {
      const self = this
      const { user } = this.$caches
      if (user.doctorId) {
        service.Customs(user.doctorId, skip, take, flag)
          .then(function (json) {
            self.customerList = json.Data
            self.customerCount = json.Count
            self.consultList = json.FirstRecords
            if (json.Count) {
              // console.log(json.Data)
              Object.assign(self.customer, json.Data[0])
            }
          })
          .catch(function (error) {
            console.log('error:', error)
          })
      } else {
        this.$Message.info('请先登录！')
        window.location.href = '/'
      }
    },
    OnChangeCustomers(currentPage) {
      let skip = (currentPage - 1) * 10
      this.OnClickByGetCustomers(skip)
    },
    OnClickByCustomer(item) {
      const self = this
      Object.assign(self.customer, item)
      service.ConsultRecords({ customId: item.CustomerId, lastId: item.DpetId })
        .then(function (json) {
          self.consultList = json
        })
        .catch(function (error) {
          console.log('error:', error)
        })
    },
    OnSendMessage() {
      console.log(this.$caches)
    }
  }
}
</script>
<style scoped>
.userinfo {
  text-align: left;
}

.userinfo label {
  padding: 0 5px;
}

.user-list {
  overflow: auto;
}

.user-avator-list {
  cursor: pointer;
  text-align: left;
}

.user-avator-list img {
  width: 50px;
  height: 50px;
  vertical-align: middle;
}

.user-avator {
  line-height: 16px;
  text-align: left;
}

.user-avator img {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}

.user-content {
  text-align: left;
}

.doctor-avator {
  line-height: 16px;
  text-align: right;
}

.doctor-content {
  text-align: right;
}

.doctor-avator img {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}

.send-bar {
  text-align: left;
  margin: 5px 0;
}
</style>
