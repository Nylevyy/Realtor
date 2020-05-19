'use strict';
const filter = document.getElementById('filter');
const priceFilter = document.getElementById('price');
const filterSubmit = document.getElementById('filterSubmit');


const price = new Map(); // Храним значения цен
price.min = 0;
price.max = Infinity;

const checked = {               // Все выбранные фильтры
    'type': new Set(),
    'district': new Set(),
    'roomNumber': new Set(),
    'price': price
};

// Обработчик события
function eventListener(e) {
    console.log(e);
    const target = e.target;
    if (!target.closest('input')) return;
    const val = target.closest('input').name.toString();    // Определяем значение
    const param = target.closest('.filter').id.toString();     // Определяем параметр

    renderList(val, param)
}

// Рендерим список
function renderList(val, param) {
    const filterValue = val;
    const filterType = param;

    // Определяем и передаем в хранилище значение для параметров цен
    if (filterType === 'price') {
        let min = +filter.querySelector('#pricemin').value;
        let max = +filter.querySelector('#pricemax').value;

        // При отсутствии значения параметра устанавливаем по умолчанию
        switch (!!min) {
            case true: {
                if (max) console.log('both');
                else max = Infinity;
                break
            }
            case false: {
                if (max) min = 0;
                else {min = 0; max = Infinity}
                break
            }
        }

        // Передаем в хранилище
        price.min = min;
        price.max = max;
    }

    // Передача "неценовых" параметров
    else {
        if (checked[filterType].has(filterValue)) checked[filterType].delete(filterValue);
        else checked[filterType].add(filterValue);
    }

    // Изначально все объекты скрыты
    const objectList = Array.from(document.querySelectorAll('.object-list-item'));
    objectList.forEach(item => {
        item.classList.add('hidden')
    });

    // Получаем отфильтрованный список
    const filteredList = checkAttributes(objectList);
    filteredList.forEach(item => item.classList.remove('hidden'))
}

// Фильтр по цене
const checkPrice = function(pre, min, max) {
    return pre.filter(item => {
        const value = +item.filterAttributes.price;
        return ((value >= min) && (value <= max))
    })
};

// Предварительно фильтруем по "неценовым" параметрам
const checkAttributes = function (object) {
    const preFiltered = object.filter(item => {

        // Проверяем на соответствие каждому параметру
        return Object.keys(item.filterAttributes).every(key => {
            if (key === 'price') return true;
            if (!checked[key].size) return true;    // При пустом значении параметра отображаются все элементы
            return checked[key].has(item.filterAttributes[key].toString())
        })
    });
    return checkPrice(preFiltered, price.min, price.max); // Возвращаем результат после ценового фильтра
};



filter.addEventListener('click', eventListener);
// priceFilter.addEventListener('keyUp', eventListener);  Сделать
filterSubmit.addEventListener('click', ev => ev.preventDefault()); // Доделать



