import {createStore} from "vuex";
import axios from "axios";

const store = createStore({
    state: {
        skins: []
    },
    mutations: {
        setSkins(state, skins) {
            state.skins = skins;
        }
    },
    getters: {
        skins(state) {
            return state.skins;
        }
    },
    actions: {
        async getAllSkins(context) {
            const result = await axios.post("https://market.csgo.com/api/graphql", {
                "operationName": "items",
                "variables": {
                    "filters": [{
                        "id": "price",
                        "min": 100,
                        "max": 1000
                    }],
                    "order": {
                        "id": "price",
                        "direction": "asc"
                    },
                    "page": 0,
                    "count": 320
                },
                "query": "query items($count: Int, $filters: [FilterInputType], $page: Int, $order: OrderInputType!) {  items(count: $count, filters: $filters, page: $page, order: $order) { data {\n      color\n      id\n      currency\n      stattrak\n      slot\n      popularity\n      features\n      rarity\n      rarity_ext {\n        id\n        name\n        __typename\n      }\n      ctp\n      quality\n      phase\n      descriptions {\n        type\n        value\n        __typename\n      }\n      type\n      tags {\n        category\n        category_name\n        localized_category_name\n        localized_tag_name\n        internal_name\n        name\n        value {\n          name\n          link\n          __typename\n        }\n        __typename\n      }\n      image_512\n      image_100\n      image_150\n      image_300\n      seo {\n        category\n        type\n        __typename\n      }\n      market_hash_name\n      market_name\n      price\n      stickers {\n        image\n        name\n        __typename\n      }\n      __typename\n    }\n    paginatorInfo {\n      count\n      currentPage\n      hasMorePages\n      lastPage\n      perPage\n      total\n      __typename\n    }\n    __typename\n  }\n}"
            });

            if (result.status === 200) {
                context.commit("setSkins", result.data.data.items.data);
            }
        }
    }
});

export default store;