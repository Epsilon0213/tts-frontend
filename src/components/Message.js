import { useEffect, useState } from 'react';
import { formatRelative } from 'date-fns';


const Message = ({
    createdAt = null,
    text = '',
    displayName = '',
    photoURL = '',
}) => {
    if (!text) return null;
    return (
    <div class="message-block-container">

        <div class="avatar-child">
        {photoURL ? (
            <img src={photoURL} alt = "Avatar" class="user-profile"/>
        ): null }

        </div>

        <div class="content-child">

            {displayName ? (
                <p class="user-name">{displayName}</p>
            ) : null}

            {createdAt ?.seconds? (
                <div class="user-timestamp">
                    {formatRelative(new Date(createdAt.seconds * 1000), new Date()
                    )}
                </div>
            ) : null}

            <p class="message-content">{text}</p>
        </div>
    </div>
    );
};



export default Message;