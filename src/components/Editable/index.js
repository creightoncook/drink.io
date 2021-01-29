import React from 'react';
import { useDebounce } from 'use-debounce';

const Editable = ({
    text,
    type,
    children,
    childRef,
    Label,
    onSetEditing = () => {},
    ...props
}) => {
    const [nonDebouncedIsEditing, defaultSetEditing] = React.useState(false);
    const [isEditing] = useDebounce(nonDebouncedIsEditing, 100, { leading: true });

    const setEditing = v => {
        onSetEditing(isEditing, text);
        defaultSetEditing(v);
    };

    React.useEffect(() => {
        if (childRef && childRef.current && isEditing === true) {
            childRef.current.focus();
            childRef.current.select();
        }
    }, [isEditing, childRef]);

    const handleKeyDown = type => event => {
        const { key } = event;
        const keys = ["Escape", "Tab"];
        const enterKey = "Enter";
        const allKeys = [...keys, enterKey];
        if (
            (type === "textarea" && keys.includes(key)) ||
            (type !== "textarea" && allKeys.includes(key))
        ) {
            setEditing(false);
        }
    };

    return (
        <section {...props}>
            {isEditing ? (
                <div
                    onBlur={() => setEditing(false) }
                    onKeyDown={handleKeyDown(type)}
                >
                    {children}
                </div>
            ) : (
                    <Label handleFocus={() => setEditing(true)} />
                )}
        </section>
    );
};

export default Editable;