'use strict';
const modal = document.querySelector("#ya-lic");
const ok = document.querySelector("#ok");
const close = document.querySelector('.close');
const more = document.querySelector('#more');
const objectList = document.querySelector('.object-list');  //obj
const objectReview = document.querySelector('.object-review');  //obj
const filterBox = document.querySelector('.filter-box'); //obj
const backButton = document.querySelector('.back-button'); //obj



const getObjects = async function(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Ошибка по адресу ${url}, Статус ошибка ${response.status}!`)
    }
    return response.json();
};


function toggleModal() {
    modal.classList.toggle("is_open");
}

function toggleForm(event) {
    event.preventDefault();

    const formP = document.querySelector('#formP');
    const form = document.querySelector('#form');
    const tableInfo = document.querySelector('.info-table');
    const objectBrief = document.querySelector('.object-brief');

    objectBrief.style.flexDirection = 'column';
    tableInfo.style.order = '2';
    formP.classList.toggle("hidden");
    form.classList.toggle("hidden");
}

function toggleObjectList() {
    objectReview.classList.toggle('hidden');
    objectList.classList.toggle('hidden');
    backButton.classList.toggle('hidden');
    filterBox.classList.toggle('hidden');

    backButton.addEventListener('click', toggleObjectList)
}

function createObjectListItem(object) {
    const { images, price, roomNumber, floor, area, city, district, address, material, year, maxFloor, height, balcony, toilet, windowView, description } = object;
    const areaPrice = Math.floor(price / area);

    const sliderWrapper = document.createElement('div');
    sliderWrapper.className = 'slider__wrapper';
    getObjects('./json/' + images).then(function (data) {
        data.forEach( function (photoItems) {
            Object.values(photoItems).forEach(function (photoItem) {
                sliderWrapper.insertAdjacentHTML("beforeend", `
                    <div class="slider__item">
                        <img src="img/${photoItem}" class="object-image preview" alt="photo">
                    </div>
                `)
            })
        })
    });

    const objectListItem = document.createElement('li');
    objectListItem.info = object;
    objectListItem.className = 'object-list-item';
    objectListItem.insertAdjacentHTML("beforeend", `
        <article class="object-card">
            <div class="slider">
                
                <a class="slider__control slider__control_left" href="#" role="button"></a>
                <a class="slider__control slider__control_right slider__control_show" href="#" role="button"></a>
            </div>
            <div class="object-card-details">
                <span class="price">${price} &#8381;</span>
                <span class="price-square">${areaPrice} &#8381;/м<sup>2</sup></span>
                <div class="object-card-properties">
                    <span class="property roomNumber">${roomNumber}-комн. квартира</span>
                    <span class="property">${floor}/${maxFloor} эт.</span>
                    <span class="property">${area} кв.м</span>
                </div>
                <p class="address">${city}</p>
                <p class="address">${district}</p>
                <p class="address">${address}</p>
                <button class="button object-button" /*data-info="${[images, price, roomNumber, floor, area, city, district, address, material, year, maxFloor, height, balcony, toilet, windowView, description]}"*/>Подробнее</button>
            </div>
        </article>
    `);
    const slider = objectListItem.querySelector('.slider');
    slider.insertAdjacentElement("afterbegin", sliderWrapper);

    objectList.insertAdjacentElement("beforeend", objectListItem);
}

function createObjectInfo(objectInfo) {
    const { images, price, roomNumber, floor, area, city, district, address, material, year, maxFloor, height, balcony, toilet, windowView, description } = objectInfo;

    const sliderWrapper = document.createElement('div');
    sliderWrapper.className = 'slider__wrapper';
    getObjects('./json/' + images).then(function (data) {
        data.forEach( function (photoItems) {
            Object.values(photoItems).forEach(function (photoItem) {
                sliderWrapper.insertAdjacentHTML("beforeend", `
                    <div class="slider__item">
                        <img src="img/${photoItem}" class="object-image preview" alt="photo">
                    </div>
                `)
            })
        })
    });

    objectReview.insertAdjacentHTML("afterbegin", `
            <div class="gallery-info">
                <div class="object-gallery">
                    <div class="slider slider-info">
                        <!--js-sliderWrapper-->
                        <a class="slider__control slider__control_left" href="#" role="button"></a>
                        <a class="slider__control slider__control_right slider__control_show" href="#" role="button"></a>
                    </div>
                </div>
                <div class="object-brief">
                    <table class="info-table">
                        <tr>
                            <td>Материал дома</td>
                            <td>${material}</td>
                        </tr>
                        <tr>
                            <td>Год постройки</td>
                            <td>${year} г.</td>
                        </tr>
                        <tr>
                            <td>Кол-во этажей в доме</td>
                            <td>${maxFloor}</td>
                        </tr>
                        <tr>
                            <td>Количество комнат</td>
                            <td>${roomNumber}</td>
                        </tr>
                        <tr>
                            <td>Высота потолков</td>
                            <td>${height} м.</td>
                        </tr>
                        <tr>
                            <td>Балкон</td>
                            <td>${balcony}</td>
                        </tr>
                        <tr>
                            <td>Санузел</td>
                            <td>${toilet}</td>
                        </tr>
                        <tr>
                            <td>Вид из окон</td>
                            <td>${windowView}</td>
                        </tr>
                    </table>
                    <div class="contact">
                        <p>Узнать подробнее:</p><br>
                        <p class="formP" id="formP"><a href="tel:+7(951)097-39-21" class="contact-ref animated infinite pulse slower" title="+79510973921">Позвоните мне</a>
                            или оставьте <a href="#" class="contact-ref animated infinite pulse slower" id="formRef">здесь</a>ваш номер и я вам перезвоню</p>
                        <form action="#" class="form hidden" id="form">
                            <label for="tel" class="label-form aside-form">Ваш номер телефона</label>
                            <input class="input-form aside-form" type="tel" name="tel" placeholder="+7(999)999-9999" aria-label="tel" id="tel" autocomplete="tel" required>
                            <label for="name" class="label-form aside-form">Ваше имя</label>
                            <input class="input-form aside-form" type="text" name="name" placeholder="Иван" autocomplete="name" id="name" required>
                            <div class="checkbox-form aside-form-checkbox">
                                <!--suppress HtmlFormInputWithoutLabel -->
                                <input class="aside-form-checkbox" type="checkbox" name="agreement" required id="agreement">
                                <span>Даю согласие на обработку персональной информации. <span class="agreement-ref-aside"><a
                                        href="#ya-lic" id="more">Подробнее</a></span></span>
                            </div>
                            <button class="button submit-button aside-submit-button" type="submit">Отправить</button>
                        </form>
                        <p>Ваш риэлтор: <i>Наталья</i></p>
                        <p>+79510973921</p>
                    </div>
                </div>
            </div>
            <div class="object-card-details object-details">
                <div class="object-card-details object-details object-details-main"><h3>${roomNumber}-комн. квартира, ${floor}/${maxFloor} эт., ${area} кв.м</h3>
                    <p><span class="price">${price} &#8381;</span><span class="price-square"> (${Math.floor(price / area)} р/кв.м)</span></p>
                    <p class="address">${city}, ${district}, ${address}</p>
                </div>
                <div class="object-description">
                <h3>Описание</h3>
                <p>${description}</p>
                </div>
            </div>
        `);
    const slider = objectReview.querySelector('.slider');
    slider.insertAdjacentElement("afterbegin", sliderWrapper);
    const moreAside = objectReview.querySelector('#more');
    const formRef = document.querySelector('#formRef');

    moreAside.addEventListener('click', toggleModal);
    formRef.addEventListener('click', toggleForm);
}

function objectInfoShow(event) {
    const target = event.target;
    const objectButton = target.closest('.object-button');


    if (objectButton) {
        const objectInfo = objectButton.closest('li').info;
        objectReview.textContent = '';
        createObjectInfo(objectInfo);
        toggleObjectList();
        multiItemSlider('.slider-info');
    }
}

function init() {

    getObjects('./json/realtor.json').then(function (data) {
        data.forEach(createObjectListItem);

    });

    objectList.addEventListener('click', objectInfoShow);
    close.addEventListener('click', toggleModal);
    ok.addEventListener('click', toggleModal);
}

function indexInit() {
    close.addEventListener('click', toggleModal);
    ok.addEventListener('click', toggleModal);
    more.addEventListener('click', toggleModal);
}


if(more) {
    indexInit();
} else {
    init()
}



