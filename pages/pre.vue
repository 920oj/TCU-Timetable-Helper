<template>
    <div class="pre">
        <myheader />
        <div class="container">
            <div class="description">
                <h2>1. 取得済み単位数の入力</h2>
                <p>はじめに、自分の取得済み単位数を入力してください。<a href="https://websrv.tcu.ac.jp/tcu_web_v3/top.do" target="_blank">Webシラバス</a>から確認することができます。取得済み単位数を入力せずに進むこともできますが、その場合は自動計算されません。</p>
            </div>

            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">基礎科目[外国語]・必修</span>
                </div>
                <input type="number" min="0" max="6" class="form-control" v-model="d1" placeholder="単位数を入力">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">基礎科目[外国語(英語)]・選択</span>
                </div>
                <input type="number" min="0" max="2" class="form-control" v-model="d2"  placeholder="単位数を入力">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">基礎科目[教養]・選択</span>
                </div>
                <input type="number" min="0" max="10" class="form-control" v-model="d3"  placeholder="単位数を入力">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">専門基礎科目・必修</span>
                </div>
                <input type="number" min="0" max="9" class="form-control" v-model="d4"  placeholder="単位数を入力">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">専門基礎科目・選択</span>
                </div>
                <input type="number" min="0" max="11" class="form-control" v-model="d5"  placeholder="単位数を入力">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">専門科目・必修</span>
                </div>
                <input type="number" min="0" max="10" class="form-control" v-model="d6"  placeholder="単位数を入力">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">専門科目[学科基盤]・必修</span>
                </div>
                <input type="number" min="0" max="4" class="form-control" v-model="d7" placeholder="単位数を入力">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">専門科目[学科基盤]・選必１</span>
                </div>
                <input type="number" min="0" max="4" class="form-control" v-model="d8"  placeholder="単位数を入力">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">専門科目[学科基盤]・選必２</span>
                </div>
                <input type="number" min="0" max="4" class="form-control" v-model="d9"  placeholder="単位数を入力">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">専門科目・選択</span>
                </div>
                <input type="number" min="0" max="52" class="form-control" v-model="d10"  placeholder="単位数を入力">
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="basic-addon1">自由選択科目</span>
                </div>
                <input type="number" min="0" max="12" class="form-control" v-model="d11"  placeholder="単位数を入力">
            </div> 
            <div class="custom-control custom-checkbox mr-sm-2">
                <input type="checkbox" class="custom-control-input" id="tapper" v-model="isTapper">
                <label class="custom-control-label" for="tapper">TAP参加生はチェック(14単位が加算されます)</label>
            </div>
            <div id="submitBtn">
                <button type="button" class="btn btn-primary" @click="toTimetableWithUnits">次へ</button>
                <nuxt-link to="/main"><button type="button" class="btn btn-secondary" @click="toTimetableWithoutUnits">入力せず次へ（自動計算されません）</button></nuxt-link>
            </div>
        </div>


    </div>
</template>

<script>
import myheader from "~/components/header.vue";

export default {
    components: {
        myheader
    },
    data() {
        return {
            d1: '',
            d2: '',
            d3: '',
            d4: '',
            d5: '',
            d6: '',
            d7: '',
            d8: '',
            d9: '',
            d10: '',
            d11: '',
            isTapper: false,
            acquired_units: null
        }
    },
    methods: {
        toTimetableWithUnits() {
            this.acquired_units = {
                d1: Number(this.d1),
                d2: Number(this.d2),
                d3: Number(this.d3),
                d4: Number(this.d4),
                d5: Number(this.d5),
                d6: Number(this.d6),
                d7: Number(this.d7),
                d8: Number(this.d8),
                d9: Number(this.d9),
                d10: Number(this.d10),
                d11: Number(this.d11),
                isTapper: this.isTapper,
                isTeacher: this.isTeacher
            }
            if(this.isTapper){
                this.acquired_units["d1"] += 4;
                this.acquired_units["d3"] += 6;
                this.acquired_units["d5"] += 4;
            }
            console.log(this.acquired_units);
            this.$store.commit('setAcquiredUnits', this.acquired_units);
            this.$router.push('/main');
        },
        toTimetableWithoutUnits() {
            let tmp = true;
            this.$store.commit('notSetAcquiredUnits', tmp);
        }
    }
};
</script>

</script>

<style>
.description {
    margin-top: 30px;
}

#submitBtn {
    margin-top: 20px;
}
</style>

