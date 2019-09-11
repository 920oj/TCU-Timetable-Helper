<template>
    <div class="result">
        <myheader />
        <div class="timetable_result">
            <div class="container">
                <div class="description">
                    <nuxt-link to="/main"><p style="color: blue;">←時間割表示に戻る</p></nuxt-link>
                    <h2>3. 完成</h2>
                    <p>リスト形式と時間割表形式で、選択した講義を確認することができます。</p>
                    <button type="button" class="btn btn-primary" @click="displayList">リスト形式で表示</button>
                    <button type="button" class="btn btn-primary" @click="displayFh">時間割表（後期前半）</button>
                    <button type="button" class="btn btn-primary" @click="displaySh">時間割表（後期後半）</button>
                </div>
                <div class="timetable_list" v-if="display_list">
                    <h3>リスト形式で表示</h3>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>講義名</th>
                                    <th>クラス</th>
                                    <th>学年</th>
                                    <th>Q</th>
                                    <th>時間</th>
                                    <th>対開講</th>
                                    <th>単位数</th>
                                    <th>種別</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in display_timetable_data" :key="index">
                                    <td><a :href="setUrl(item)" target="_blank">{{item.name}}</a></td>
                                    <td>{{changeClass(item.class)}}</td>
                                    <td>{{changePossible(item.possible)}}</td>
                                    <td>{{changeQuarter(item.quarter)}}</td>
                                    <td>{{changeData(item.date_id)}}</td>
                                    <td>{{changeData(item.cdate_id)}}</td>
                                    <td>{{item.credits + '単位'}}</td>
                                    <td>{{changeCategory(item.category)}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="timetable_table_fh" v-if="display_table_fh">
                    <h3>時間割表(後期前半)</h3>
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>/</th>
                                    <th>月曜</th>
                                    <th>火曜</th>
                                    <th>水曜</th>
                                    <th>木曜</th>
                                    <th>金曜</th>
                                    <th>土曜</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>{{fh_ids[1]}}</td>
                                    <td>{{fh_ids[6]}}</td>
                                    <td>{{fh_ids[11]}}</td>
                                    <td>{{fh_ids[16]}}</td>
                                    <td>{{fh_ids[21]}}</td>
                                    <td>{{fh_ids[26]}}</td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>{{fh_ids[2]}}</td>
                                    <td>{{fh_ids[7]}}</td>
                                    <td>{{fh_ids[12]}}</td>
                                    <td>{{fh_ids[17]}}</td>
                                    <td>{{fh_ids[22]}}</td>
                                    <td>{{fh_ids[27]}}</td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td>{{fh_ids[3]}}</td>
                                    <td>{{fh_ids[8]}}</td>
                                    <td>{{fh_ids[13]}}</td>
                                    <td>{{fh_ids[18]}}</td>
                                    <td>{{fh_ids[23]}}</td>
                                    <td>{{fh_ids[28]}}</td>
                                </tr>
                                <tr>
                                    <th>4</th>
                                    <td>{{fh_ids[4]}}</td>
                                    <td>{{fh_ids[9]}}</td>
                                    <td>{{fh_ids[14]}}</td>
                                    <td>{{fh_ids[19]}}</td>
                                    <td>{{fh_ids[24]}}</td>
                                    <td>{{fh_ids[29]}}</td>
                                </tr>
                                <tr>
                                    <th>5</th>
                                    <td>{{fh_ids[5]}}</td>
                                    <td>{{fh_ids[10]}}</td>
                                    <td>{{fh_ids[15]}}</td>
                                    <td>{{fh_ids[20]}}</td>
                                    <td>{{fh_ids[25]}}</td>
                                    <td>{{fh_ids[30]}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="timetable_table_sh" v-if="display_table_sh">
                    <h3>時間割表(後期後半)</h3>
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>/</th>
                                    <th>月曜</th>
                                    <th>火曜</th>
                                    <th>水曜</th>
                                    <th>木曜</th>
                                    <th>金曜</th>
                                    <th>土曜</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>1</th>
                                    <td>{{sh_ids[1]}}</td>
                                    <td>{{sh_ids[6]}}</td>
                                    <td>{{sh_ids[11]}}</td>
                                    <td>{{sh_ids[16]}}</td>
                                    <td>{{sh_ids[21]}}</td>
                                    <td>{{sh_ids[26]}}</td>
                                </tr>
                                <tr>
                                    <th>2</th>
                                    <td>{{sh_ids[2]}}</td>
                                    <td>{{sh_ids[7]}}</td>
                                    <td>{{sh_ids[12]}}</td>
                                    <td>{{sh_ids[17]}}</td>
                                    <td>{{sh_ids[22]}}</td>
                                    <td>{{sh_ids[27]}}</td>
                                </tr>
                                <tr>
                                    <th>3</th>
                                    <td>{{sh_ids[3]}}</td>
                                    <td>{{sh_ids[8]}}</td>
                                    <td>{{sh_ids[13]}}</td>
                                    <td>{{sh_ids[18]}}</td>
                                    <td>{{sh_ids[23]}}</td>
                                    <td>{{sh_ids[28]}}</td>
                                </tr>
                                <tr>
                                    <th>4</th>
                                    <td>{{sh_ids[4]}}</td>
                                    <td>{{sh_ids[9]}}</td>
                                    <td>{{sh_ids[14]}}</td>
                                    <td>{{sh_ids[19]}}</td>
                                    <td>{{sh_ids[24]}}</td>
                                    <td>{{sh_ids[29]}}</td>
                                </tr>
                                <tr>
                                    <th>5</th>
                                    <td>{{sh_ids[5]}}</td>
                                    <td>{{sh_ids[10]}}</td>
                                    <td>{{sh_ids[15]}}</td>
                                    <td>{{sh_ids[20]}}</td>
                                    <td>{{sh_ids[25]}}</td>
                                    <td>{{sh_ids[30]}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="credits">
                    <h3>単位数計算</h3>
                    <p>これまでの取得した単位数と合わせ、今季すべての単位を取得した場合の計算結果が以下になります。</p>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>単位区分</th>
                                    <th>必要単位数</th>
                                    <th>修得単位数</th>
                                    <th>不足単位数</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>基礎科目[外国語]・必修</th>
                                    <td>6</td>
                                    <td>{{total_units["d1"]}}</td>
                                    <td>{{6 - total_units["d1"]}}</td>
                                </tr>
                                <tr>
                                    <th>基礎科目[外国語(英語)]・選択</th>
                                    <td>2</td>
                                    <td>{{total_units["d2"]}}</td>
                                    <td>{{2 - total_units["d2"]}}</td>
                                </tr>
                                <tr>
                                    <th>基礎科目[教養]・選択</th>
                                    <td>10</td>
                                    <td>{{total_units["d3"]}}</td>
                                    <td>{{10 - total_units["d3"]}}</td>
                                </tr>
                                <tr>
                                    <th>専門基礎科目・必修</th>
                                    <td>9</td>
                                    <td>{{total_units["d4"]}}</td>
                                    <td>{{9 - total_units["d4"]}}</td>
                                </tr>
                                <tr>
                                    <th>専門基礎科目・選択</th>
                                    <td>11</td>
                                    <td>{{total_units["d5"]}}</td>
                                    <td>{{11 - total_units["d5"]}}</td>
                                </tr>
                                <tr>
                                    <th>専門科目・必修</th>
                                    <td>10</td>
                                    <td>{{total_units["d6"]}}</td>
                                    <td>{{10 - total_units["d6"]}}</td>
                                </tr>
                                <tr>
                                    <th>専門科目[学科基盤]・必修</th>
                                    <td>4</td>
                                    <td>{{total_units["d7"]}}</td>
                                    <td>{{4 - total_units["d7"]}}</td>
                                </tr>
                                <tr>
                                    <th>専門科目[学科基盤]・選必１</th>
                                    <td>4</td>
                                    <td>{{total_units["d8"]}}</td>
                                    <td>{{4 - total_units["d8"]}}</td>
                                </tr>
                                <tr>
                                    <th>専門科目[学科基盤]・選必２</th>
                                    <td>4</td>
                                    <td>{{total_units["d9"]}}</td>
                                    <td>{{4 - total_units["d9"]}}</td>
                                </tr>
                                <tr>
                                    <th>専門科目・選択</th>
                                    <td>52</td>
                                    <td>{{total_units["d10"]}}</td>
                                    <td>{{52 - total_units["d10"]}}</td>
                                </tr>
                                <tr>
                                    <th>自由選択科目</th>
                                    <td>12</td>
                                    <td>{{total_units["d11"]}}</td>
                                    <td>{{12 - total_units["d11"]}}</td>
                                </tr>
                                <tr>
                                    <th>合計</th>
                                    <td>124</td>
                                    <td>{{total_units["d1"] + total_units["d2"] + total_units["d3"] + total_units["d4"] + total_units["d5"] + total_units["d6"] + total_units["d7"] + total_units["d8"] + total_units["d9"] + total_units["d10"] + total_units["d11"]}}</td>
                                    <td style="color:red;">{{124 - total_units["d1"] - total_units["d2"] - total_units["d3"] - total_units["d4"] - total_units["d5"] - total_units["d6"] - total_units["d7"] - total_units["d8"] - total_units["d9"] - total_units["d10"] - total_units["d11"] }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import myheader from "~/components/header.vue";
import underscore from 'underscore';

export default {
    components: {
        myheader,
    },
    data() {
        return {
            acquired_units: [],
            checked_ids: [],
            timetable_data: null,
            display_timetable_data: [],
            display_list: true,
            display_table_fh: false,
            display_table_sh: false,
            fh_ids: {},
            fh_datas: [],
            sh_ids: {},
            sh_datas: [],
            total_units: null
        }
    },
    created: function() {
        this.acquired_units = this.$store.state.acquired_units;
        this.checked_ids = this.$store.state.plan_units;
        this.total_units = this.$store.state.total_units;
        const self = this;
        const get_timetable_data = this.$axios.$get("https://tcu-timetable-helper.netlify.com/data/71.json")
            .then(response => {
                self.timetable_data = response;
                self.displayTimetable();
            }
        )

    },
    methods: {
        displayTimetable(){
            const self = this;
            this.checked_ids.forEach(function(num){
                let query = {}
                query.id = num
                let tmp = underscore.filter(self.timetable_data,query);
                self.display_timetable_data.push(tmp[0]);
            })
            // ソート処理
            this.display_timetable_data.sort(function(a,b){
                if(a.date_id<b.date_id) return -1;
                if(a.date_id > b.date_id) return 1;
                return 0;
            });
        },
        changeData(data_id) {
            return cData(data_id);
        },
        changeQuarter(quarter) {
            return cQuarter(quarter);
        },
        changeClass(d_class) {
            return cClass(d_class);
        },
        changeCategory(category) {
            return cCategory(category);
        },
        changePossible(possible){
            return cPossible(possible);
        },
        setUrl(item){
            let url = 'https://websrv.tcu.ac.jp/tcu_web_v3/slbssbdr.do?value(risyunen)=2019&value(semekikn)=1&value(kougicd)=';
            return url + item.code;
        },
        displayList(){
            this.display_list = true;
            this.display_table_fh = false;
            this.display_table_sh = false;
        },
        displayFh(){
            this.display_list = false;
            this.display_table_fh = true;
            this.display_table_sh = false;

            this.fh_datas = [];
            const self = this;
            this.display_timetable_data.forEach(function(num){
                if(num.quarter == 3 || num.quarter == 4){
                    self.fh_datas.push(num);
                }
            })
            console.log(this.fh_datas);
            this.fh_ids = {};
            this.fh_datas.forEach(function(num){
                self.fh_ids[num.date_id] = num.name;
                if(num.cdate_id != 0){
                    self.fh_ids[num.cdate_id] = num.name;
                }
            })
            console.log(self.fh_ids);
        },
        displaySh(){
            this.display_list = false;
            this.display_table_fh = false;
            this.display_table_sh = true;

            this.sh_datas = [];
            const self = this;
            this.display_timetable_data.forEach(function(num){
                if(num.quarter == 3 || num.quarter == 5){
                    self.sh_datas.push(num);
                }
            })
            console.log(this.sh_datas);

            this.sh_ids = {};
            this.sh_datas.forEach(function(num){
                console.log(num);
                self.sh_ids[num.date_id] = num.name;
                if(num.cdate_id != 0){
                    self.sh_ids[num.cdate_id] = num.name;
                }
            })
            console.log(this.sh_ids);
        },
    }
}
</script>

<style>
h3 {
    margin: 30px 0;
}
</style>