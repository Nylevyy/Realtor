'use strict';
const filter = document.getElementById('filter');
const priceFilter = document.getElementById('price');
const filterReset = document.getElementById('filterReset');

// Храним значения цен
const price = new Map();
price.min = 0;
price.max = Infinity;

// Все выбранные фильтры
const checked = {
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

    renderList(val, param)  // Передаем на рендер параметр-значение
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
                else {
                    min = 0;
                    max = Infinity
                }
                break
            }
        }

        // Передаем в хранилище
        price.min = min;
        price.max = max;

        // При вводе мин. цены > макс. цены
        if (min > max) {
            filter.querySelectorAll('.price-input').forEach(item => {
                item.style.borderColor = 'red'
            })
        } else {
            filter.querySelectorAll('.price-input').forEach(item => {
                item.style.borderColor = 'initial'
            })
        }
    }


    // Передача "неценовых" параметров
    else {
        if (checked[filterType].has(filterValue)) checked[filterType].delete(filterValue);
        else checked[filterType].add(filterValue);
    }
    console.log(checked.roomNumber);
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
        const params = item.filterAttributes;

        // Проверяем на соответствие каждому параметру
        return Object.keys(params).every(key => {
            // Для квартир с более 4 комнат
            if (key === 'roomNumber' && checked[key].has('4') && params[key] > 4) return true;

            if (key === 'price') return true;

            // При пустом значении параметра отображаются все элементы
            if (!checked[key].size) return true;
            return checked[key].has(params[key].toString())
        })
    });
    return checkPrice(preFiltered, price.min, price.max); // Возвращаем результат после ценового фильтра
};

// Сброс фильтра
function resetFilter() {
    // Очищаем все параметры
    price.min = 0;
    price.max = Infinity;
    checked.type.clear();
    checked.district.clear();
    checked.roomNumber.clear();

    // Показываем все объекты
    const objectList = Array.from(document.querySelectorAll('.object-list-item'));
    objectList.forEach(item => {
        item.classList.remove('hidden')
    });
}


filterReset.addEventListener('click', resetFilter);
filter.addEventListener('click', eventListener);
priceFilter.addEventListener('keyup', eventListener);  // Для ввода цен с клавиатуры



