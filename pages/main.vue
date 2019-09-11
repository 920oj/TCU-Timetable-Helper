<template>
  <div class="main">
    <myheader />
    <div class="select_timetable">
        <div class="container">
            <div class="description">
                <nuxt-link to="/pre"><p style="color: blue;">←取得済み単位数入力に戻る</p></nuxt-link>
                <h2>2. 時間割表示</h2>
                <p>下の時間割表から、今季受講したい講義を選んでください。下のドロップダウンメニューから絞り込みもできます。</p>
                <select class="form-control" id="exampleFormControlSelect1" v-model="selected_day">
                    <option value="0">曜日: 全表示</option>
                    <option value="1">曜日: 月曜日</option>
                    <option value="2">曜日: 火曜日</option>
                    <option value="3">曜日: 水曜日</option>
                    <option value="4">曜日: 木曜日</option>
                    <option value="5">曜日: 金曜日</option>
                    <option value="6">曜日: 土曜日</option>
                </select>
                <select class="form-control" id="exampleFormControlSelect1" v-model="selected_quarter">
                    <option value="0">クォーター: 全表示</option>
                    <option value="3">クォーター: 後期</option>
                    <option value="4">クォーター: 後期前半</option>
                    <option value="5">クォーター: 後期後半</option>
                </select>
                <select class="form-control" id="exampleFormControlSelect1" v-model="selected_category">
                    <option value="0">単位計上区分: 全表示</option>
                    <option value="1">単位計上区分: 基礎科目[外国語]・必修</option>
                    <option value="2">単位計上区分: 基礎科目[外国語(英語)]・選択</option>
                    <option value="3">単位計上区分: 基礎科目[教養]・選択</option>
                    <option value="4">単位計上区分: 専門基礎科目・必修</option>
                    <option value="5">単位計上区分: 専門基礎科目・選択</option>
                    <option value="6">単位計上区分: 専門科目・必修</option>
                    <option value="7">単位計上区分: 専門科目[学科基盤]・必修</option>
                    <option value="8">単位計上区分: 専門科目[学科基盤]・選必１</option>
                    <option value="9">単位計上区分: 専門科目[学科基盤]・選必２</option>
                    <option value="10">単位計上区分: 専門科目・選択</option>
                    <option value="11">単位計上区分: 自由選択科目</option>
                    <option value="12">単位計上区分: 教職科目</option>
                </select>
                <button type="button" class="btn btn-primary btn-lg btn-block" @click="refine">上記条件で絞り込み</button>
                <p style="margin-top: 10px;">現在の単位数: {{countCredits}}   <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample">現在の単位計算結果を表示</button></p>
                <div class="collapse" id="collapseExample">
                <div class="card card-body">
                    <p v-if="$store.state.is_acquired_skipped" style="color: red;">取得済み単位数が入力されていないので、正常に表示されない可能性があります。</p>
                    <p>基礎科目[外国語]・必修: {{countTotalCredits["d1"]}} / 不足: <span style="color: red;">{{6 - countTotalCredits["d1"]}}</span></p>
                    <p>基礎科目[外国語(英語)]・選択: {{countTotalCredits["d2"]}} / 不足: <span style="color: red;">{{2 - countTotalCredits["d2"]}}</span></p>
                    <p>基礎科目[教養]・選択: {{countTotalCredits["d3"]}} / 不足: <span style="color: red;">{{10 - countTotalCredits["d3"]}}</span></p>
                    <p>専門基礎科目・必修: {{countTotalCredits["d4"]}} / 不足: <span style="color: red;">{{9 - countTotalCredits["d4"]}}</span></p>
                    <p>専門基礎科目・選択: {{countTotalCredits["d5"]}} / 不足: <span style="color: red;">{{11 - countTotalCredits["d5"]}}</span></p>
                    <p>専門科目・必修: {{countTotalCredits["d6"]}} / 不足: <span style="color: red;">{{10 - countTotalCredits["d6"]}}</span></p>
                    <p>専門科目[学科基盤]・必修: {{countTotalCredits["d7"]}} / 不足: <span style="color: red;">{{4 - countTotalCredits["d7"]}}</span></p>
                    <p>専門科目[学科基盤]・選必１: {{countTotalCredits["d8"]}} / 不足: <span style="color: red;">{{4 - countTotalCredits["d8"]}}</span></p>
                    <p>専門科目[学科基盤]・選必２: {{countTotalCredits["d9"]}} / 不足: <span style="color: red;">{{4 - countTotalCredits["d9"]}}</span></p>
                    <p>専門科目・選択: {{countTotalCredits["d10"]}} / 不足: <span style="color: red;">{{52 - countTotalCredits["d10"]}}</span></p>
                    <p>自由選択科目: {{countTotalCredits["d11"]}} / 不足: <span style="color: red;">{{12 - countTotalCredits["d11"]}}</span></p>
                </div>
                </div>
            </div>
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>☑</th>
                            <th>講義名</th>
                            <th>クラス</th>
                            <th>学年</th>
                            <th>Q</th>
                            <th>時間</th>
                            <th>対開講</th>
                            <th>種別</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,index) in display_timetable_data" :key="index" :style="isDisabled(item)">
                            <th><input type="checkbox" v-model="checked_ids" :value="item.id" class="check"></th>
                            <td><a :href="setUrl(item)" target="_blank">{{item.name}}</a></td>
                            <td>{{changeClass(item.class)}}</td>
                            <td>{{changePossible(item.possible)}}</td>
                            <td>{{changeQuarter(item.quarter)}}</td>
                            <td>{{changeData(item.date_id)}}</td>
                            <td>{{changeData(item.cdate_id)}}</td>
                            <td>{{changeCategory(item.category)}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    
    <footer>
        <div class="container">
            <button type="button" class="btn btn-primary btn-lg btn-block" @click="gotoResult" v-if="countCredits <= 24">選択終了</button>
            <button type="button" class="btn btn-primary btn-lg btn-block" v-if="countCredits > 24" disabled>24単位を超えています</button>
        </div>
    </footer>
  </div>
</template>

<script>
import myheader from "~/components/header.vue";
import underscore from 'underscore';

export default {
    components: {
        myheader
    },
    data() {
        return {
            timetable_data: null,
            display_timetable_data: null,
            checked_ids: [],
            selected_date: [],
            selected_day: 0,
            selected_quarter: 0,
            selected_category: 0,
            disabled_check: []
        };
    },
    created: function() {
        if(this.$store.state.acquired_units == null && this.$store.state.is_acquired_skipped == false){
            this.$router.push('/');
        }
        const get_timetable_data = this.$axios.$get("/data/61.json").then(response => {
            this.timetable_data = response;
            this.display_timetable_data = this.timetable_data;
        });
    },
    computed: {
        countCredits() {
            let credits = 0;
            this.selected_date = [];
            let dis_tmp = []
            const self = this;
            this.checked_ids.forEach(function(num){
                let query = {};
                query.id = num;
                let tmp = underscore.filter(self.timetable_data, query);
                credits += tmp[0].credits;
                console.log(String(tmp[0].disabled));
                console.log(String(tmp[0].disabled).slice(-1));

                // disbaled_checkの処理
                if(String(tmp[0].disabled).slice(-1) == 3){
                    dis_tmp.push(tmp[0].disabled);
                    dis_tmp.push(tmp[0].disabled + 1);
                    dis_tmp.push(tmp[0].disabled + 2);
                }
                else if(String(tmp[0].disabled).slice(-1) == 4){
                    dis_tmp.push(tmp[0].disabled - 1);
                    dis_tmp.push(tmp[0].disabled);
                }
                else if(String(tmp[0].disabled).slice(-1) == 5){
                    dis_tmp.push(tmp[0].disabled - 2);
                    dis_tmp.push(tmp[0].disabled);
                }
                if(tmp[0].cdisabled != 0){
                    if(String(tmp[0].cdisabled).slice(-1) == 3){
                        dis_tmp.push(tmp[0].cdisabled);
                        dis_tmp.push(tmp[0].cdisabled + 1);
                        dis_tmp.push(tmp[0].cdisabled + 2);
                    }
                    else if(String(tmp[0].cdisabled).slice(-1) == 4){
                        dis_tmp.push(tmp[0].cdisabled - 1);
                        dis_tmp.push(tmp[0].cdisabled);
                    }
                    else if(String(tmp[0].cdisabled).slice(-1) == 5){
                        dis_tmp.push(tmp[0].cdisabled - 2);
                        dis_tmp.push(tmp[0].cdisabled);
                    }
                } 
            })
            self.disabled_check = dis_tmp.filter((x, i, self) => self.indexOf(x) === i);
            return credits;
        },
        countTotalCredits() {
            let total_credits = {"d1": 0,"d2": 0,"d3": 0,"d4": 0,"d5": 0,"d6": 0,"d7": 0,"d8": 0,"d9": 0,"d10": 0,"d11": 0};
            if(this.$store.state.is_acquired_skipped == false){
                total_credits["d1"] += Number(this.$store.state.acquired_units["d1"]);
                total_credits["d2"] += Number(this.$store.state.acquired_units["d2"]);
                total_credits["d3"] += Number(this.$store.state.acquired_units["d3"]);
                total_credits["d4"] += Number(this.$store.state.acquired_units["d4"]);
                total_credits["d5"] += Number(this.$store.state.acquired_units["d5"]);
                total_credits["d6"] += Number(this.$store.state.acquired_units["d6"]);
                total_credits["d7"] += Number(this.$store.state.acquired_units["d7"]);
                total_credits["d8"] += Number(this.$store.state.acquired_units["d8"]);
                total_credits["d9"] += Number(this.$store.state.acquired_units["d9"]);
                total_credits["d10"] += Number(this.$store.state.acquired_units["d10"]);
                total_credits["d11"] += Number(this.$store.state.acquired_units["d11"]);
            }
            const self = this;
            this.checked_ids.forEach(function(num){
                let query = {};
                query.id = num;
                let tmp = underscore.filter(self.timetable_data, query);
                switch(tmp[0].category){
                    case 1:
                        total_credits["d1"] += Number(tmp[0].credits);
                        break;
                    case 2:
                        total_credits["d2"] += Number(tmp[0].credits);
                        break;
                    case 3:
                        total_credits["d3"] += Number(tmp[0].credits);
                        break;
                    case 4:
                        total_credits["d4"] += Number(tmp[0].credits);
                        break;
                    case 5:
                        total_credits["d5"] += Number(tmp[0].credits);
                        break;
                    case 6:
                        total_credits["d6"] += Number(tmp[0].credits);
                        break;
                    case 7:
                        total_credits["d7"] += Number(tmp[0].credits);
                        break;
                    case 8:
                        total_credits["d8"] += Number(tmp[0].credits);
                        break;
                    case 9:
                        total_credits["d9"] += Number(tmp[0].credits);
                        break;
                    case 10:
                        total_credits["d10"] += Number(tmp[0].credits);
                        break;
                    case 11:
                        total_credits["d11"] += Number(tmp[0].credits);
                        break;
                    default:
                        break;
                }
            });
            if(total_credits["d3"] > 10){
                total_credits["11"] += (Number(total_credits["d3"]) - 10)
                total_credits["d3"] = 10;
            }
            if(total_credits["d8"] > 4){
                total_credits["d10"] += (Number(total_credits["d8"]) - 4)
                total_credits["d8"] = 4;
            }
            if(total_credits["d9"] > 4){
                total_credits["d10"] += (Number(total_credits["d9"]) - 4)
                total_credits["d9"] = 4;
            }
            return total_credits;
        },
    },
    methods: {
        changeData(data_id) {
            switch(data_id){
                case 0:
                    return "―";
                    break;
                case 1:
                    return "月1";
                    break;
                case 2:
                    return "月2";
                    break;
                case 3:
                    return "月3";
                    break;
                case 4:
                    return "月4";
                    break;
                case 5:
                    return "月5";
                    break;
                case 6:
                    return "火1";
                    break;
                case 7:
                    return "火2";
                    break;
                case 8:
                    return "火3";
                    break;
                case 9:
                    return "火4";
                    break;
                case 10:
                    return "火5";
                    break;
                case 11:
                    return "水1";
                    break;
                case 12:
                    return "水2";
                    break;
                case 13:
                    return "水3";
                    break;
                case 14:
                    return "水4";
                    break;
                case 15:
                    return "水5";
                    break;
                case 16:
                    return "木1";
                    break;
                case 17:
                    return "木2";
                    break;
                case 18:
                    return "木3";
                    break;
                case 19:
                    return "木4";
                    break;
                case 20:
                    return "木5";
                    break;
                case 21:
                    return "金1";
                    break;
                case 22:
                    return "金2";
                    break;
                case 23:
                    return "金3";
                    break;
                case 24:
                    return "金4";
                    break;
                case 25:
                    return "金5";
                    break;
                case 26:
                    return "土1";
                    break;
                case 27:
                    return "土2";
                    break;
                case 28:
                    return "土3";
                    break;
                case 29:
                    return "土4";
                    break;
                case 30:
                    return "土5";
                    break;
                default:
                    return "未設定";
                    break;
            }
        },
        changeQuarter(quarter) {
            switch(quarter){
                case 3:
                    return "後期";
                    break;
                case 4:
                    return "後期前半";
                    break;
                case 5:
                    return "後期後半";
                    break;
            }
        },
        changeClass(d_class) {
            switch(d_class){
                case 0:
                    return "―";
                    break;
                default:
                    return d_class;
                    break;
            }
        },
        changeCategory(category) {
            switch(category){
                case 0:
                    return "―";
                    break;
                case 1:
                    return "基礎科目[外国語]・必修";
                    break;
                case 2:
                    return "基礎科目[外国語(英語)]・選択";
                    break;
                case 3:
                    return "基礎科目[教養]・選択";
                    break;
                case 4:
                    return "専門基礎科目・必修";
                    break;
                case 5:
                    return "専門基礎科目・選択";
                    break;
                case 6:
                    return "専門科目・必修";
                    break;
                case 7:
                    return "専門科目[学科基盤]・必修";
                    break;
                case 8:
                    return "専門科目[学科基盤]・選必１";
                    break;
                case 9:
                    return "専門科目[学科基盤]・選必２";
                    break;
                case 10:
                    return "専門科目・選択";
                    break;
                case 11:
                    return "自由選択科目";
                    break;
                case 12:
                    return "教職科目";
                    break;
            }
        },
        changePossible(possible){
            switch(possible){
                case 0:
                    return "―";
                    break;
                case 1:
                    return "1年";
                    break;
                case 2:
                    return "2年";
                    break;
                case 3:
                    return "3年";
                    break;
                case 4:
                    return "4年";
                    break;       
            }
        },
        setUrl(item){
            let url = 'https://websrv.tcu.ac.jp/tcu_web_v3/slbssbdr.do?value(risyunen)=2019&value(semekikn)=1&value(kougicd)=';
            return url + item.code;
        },
        refine(){
            let query = {};
            if(this.selected_day != 0){
                query.day = Number(this.selected_day);
            }
            if(this.selected_quarter != 0){
                query.quarter = Number(this.selected_quarter);
            }
            if(this.selected_category != 0){
                query.category = Number(this.selected_category);
            }
            console.log(query);
            this.display_timetable_data = underscore.filter(this.timetable_data,query);
            console.log(this.display_timetable_data[0]);
        },
        gotoResult() {
            console.log(this.checked_ids);
            this.$store.commit('setPlanUnits', this.checked_ids);
            console.log('追加されました');
        },
        isDisabled(item) {
            let tmp_css = '';
            this.disabled_check.forEach(function(num){
                if(item.disabled == num || item.cdisabled == num){
                    tmp_css = 'text-decoration: line-through;'
                }
            });
            this.checked_ids.forEach(function(num){
                if(item.id == num){
                    tmp_css = '';
                }
            });
            return tmp_css;
        },

    }
};

</script>

<style>
.description {
    margin-top: 30px;
}

.check {
	position: relative;
	display: inline-block;
	width: 20px;
	height: 20px;
	border: 1px solid #666;
	border-radius: 100%;
	overflow: hidden;
	cursor: pointer;
}

.table {
    white-space: nowrap;
}

.select_timetable {
    flex: 1;
}

footer {
    height: 50px;
}

</style>