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

    ACTION paid(name from) {

        //tx_index ;
        tx_index _transaction(_self, _code.value);


        _transaction.emplace(_self, [&](auto &row){
            row.account = from;
            row.paid = true;
            row.amount_owed = 1000;
        
        print("Payment received!");
        print(row.paid);

        });
    }
};
EOSIO_DISPATCH( eosecure, (paid))