export function countCategories(array) {
    const categoryCounts = {};
    for (const item of array) {
        const category = item.category;
        if (category in categoryCounts) {
            categoryCounts[category] += 1;
        } else {
            categoryCounts[category] = 1;
        }
    }

    const result = [];
    for (const [category, count] of Object.entries(categoryCounts)) {
        result.push(count)
    }

    return result;
}

export function countStores(array) {
    const storesCount = {};
    for (const item of array) {
        const store = item.store;
        if (store in storesCount) {
            storesCount[store] += 1;
        } else {
            storesCount[store] = 1;
        }
    }

    const result = [];
    for (const [store, count] of Object.entries(storesCount)) {
        result.push(count)
    }

    return result;
}

export function countPriceByCategories(array) {
    const categoryCounts = {};
    let totalPrice = 0;
    for (const item of array) {
        totalPrice += item.price;
        const category = item.category;
        if (category in categoryCounts) {
            categoryCounts[category] += item.price;
        } else {
            categoryCounts[category] = item.price;
        }
    }

    const result = [];
    for (const [category, count] of Object.entries(categoryCounts)) {
        result.push(count)
    }

    return {result, totalPrice};
}

export function reduceString(str, maxLength) {
    if (str.length <= maxLength) {
        return str;
    } else {
        return str.slice(0, maxLength) + '...';
    }
}