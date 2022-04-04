import { Observable } from "rxjs";
import { ItemToShop } from "./item-to-shop";

export interface ShoppingList {
    id?: string,
    name: string,
    itemsToShop$?: Observable<ItemToShop[]>,
    owner: string,
    canRead: string[],
    canWrite: string[]
}
