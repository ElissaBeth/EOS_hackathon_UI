#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/print.hpp>

using namespace eosio;

class eosecure : public contract {
  public:
    using contract::contract;

    TABLE transaction {
    uint64_t primary_key() const { return account.value; }
    name account;
    bool paid;
    uint128_t amount_owed;
    };

    typedef eosio::multi_index<"transaction"_n, transaction> tx_index;
    tx_index _transaction;

    ACTION get_money(name from, name to, asset quantity, std::string memo) {

        print("Suhh. Step 1");
        if(from == _self || to != _self)
            return;

        _transaction.emplace(_self, [&](auto &row){
            row.account = from;
            row.paid = true;
            row.amount_owed = 1000;
        
        print("WOAH. Step 2");

        });
    }
};

extern "C" {
    void apply(uint64_t receiver, uint64_t code, uint64_t action) {
        if(code==receiver)
        {
            EOSIO_DISPATCH_HELPER( eosecure, (get_money) );
        }
        // Might be "VCN" or "vcoin"
        else if(code=="vcoin" && action=="transfer"_n.value) {
            execute_action( name(receiver), name(code), &eosecure::get_money );
        }
    }
}