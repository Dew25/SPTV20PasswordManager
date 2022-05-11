

package jsonbuilders;

import entity.AccountData;
import java.util.List;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;


public class AccountDataJsonBuilder {
    public JsonObject getJsonAccountData(AccountData accountData){
        JsonObjectBuilder job = Json.createObjectBuilder();
        job.add("id", accountData.getId());
        job.add("caption", accountData.getCaption());
        job.add("url", accountData.getUrl());
        job.add("login", accountData.getLogin());
        job.add("password", accountData.getPassword());
        job.add("pathToImage", accountData.getPathToImage());
        return job.build();
    }
    public JsonArray getJsonArrayAccountData(List<AccountData> listAccountData){
        JsonArrayBuilder jab = Json.createArrayBuilder();
        for(int i = 0; i < listAccountData.size(); i++){
            jab.add(getJsonAccountData(listAccountData.get(i)));
        }
        return jab.build();
    }
}
