import React, { useRef } from 'react'
import PopupWithForm from './PopupWithForm'

const EditAvatarPopup = (props) => {
    const avatar = useRef();

    function handleSubmit (e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatar.current.value
        });
        e.target.reset()
    }
    return (
        <PopupWithForm name="replace-avatar" title="Обновить аватар" onSubmit={handleSubmit} {...props} textButton="Сохранить" onState={false}>
            <input placeholder="Ссылка на картинку" className="form__input form__input_url" type="url" name="url" id="url-avatar" ref={avatar} required />
            <span className="form__error url-avatar-error" id="url-avatar-error" />
        </PopupWithForm>

    )
}

export default EditAvatarPopup