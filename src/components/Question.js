import { formatRelative } from 'date-fns';


const Question = ({
    createdAt = null,
    question = '',
    displayName = '',
    photoURL = '',
}) => {
    if (!question) return null;
    return (
    <div class="question-content">

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

            <p>{question}</p>
        </div>
    </div>

    );
};



export default Question;