<template>
    <div class="bg-white w-full h-screen">
        <div
            class="container mx-auto flex items-center justify-center min-h-[600px] !max-w-[960px]"
        >
            <form action="" class="heroInputForm">
                <div class="heroInputGroup">
                    <input class="heroInput" placeholder="Email Address" />
                    <button class="heroButton">Hire Alpha Teams</button>
                </div>
                <p class="heroInputParagraph">
                    Flexible Contracts With Simple Monthly Billing
                </p>
            </form>
        </div>
    </div>
    <div class="bg-neutral-900 w-full h-screen">
        <div
            class="container mx-auto flex items-center justify-center min-h-[600px] !max-w-[960px]"
        >
            <form action="" class="augmentInputForm" id="augmentInputForm">
                <div class="augmentInputGroup" id="augmentInputGroup">
                    <input
                        required
                        class="augmentInput"
                        id="augmentInput"
                        placeholder="Email Address"
                    />
                    <button class="augmentButton" id="augmentButton">
                        Hire Alpha Teams
                    </button>
                </div>
                <p class="augmentInputParagraph">
                    Flexible Contracts With Simple Monthly Billing
                </p>
            </form>
        </div>
    </div>
</template>

<script></script>

<style>
.augmentInputForm {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    width: 100%;
    font-family: "Satoshi";

    & .augmentInputGroup {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
        width: 100%;
        
        & .augmentInput {
            box-sizing: border-box !important;
            all: unset;
            font-weight: 500;
            font-size: 20px;
            flex-grow: 1;
            background: #171717;
            border: 1px solid #d4d4d4;
            padding: 16px 16px 16px 16px;
            border-radius: 100px;
            width: 100%;
        }

        & .augmentButton {
            all: unset;
            padding: 16px 24px 16px 24px;
            background: linear-gradient(to right, #4ac7e2, #36e0c2);
            color: black;
            border-radius: 100px;
            cursor: pointer;
            font-weight: 700;
            font-size: 22px;
            flex-shrink: 0;
            flex-grow: 0;
        }
        & .augmentInput:focus {
            border: 1px solid white;
        }
        & .augmentButton:hover {
            background: linear-gradient(to right, #3daec7, #2acaac);
        }
    }

    & .augmentInputParagraph {
        font-weight: 500;
        font-size: 18px;
        color: #d4d4d4;
        margin-left: 8px;
    }
}
.heroInputForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    width: 100%;

    & .heroInputGroup {
        display: flex;
        align-items: stretch;
        gap: 8px;
        overflow: hidden;
        width: 100%;
        font-family: "Satoshi";
        background: #f5f5f5;
        border: 1px solid #d4d4d4;
        border-radius: 100px;
        padding: 4px 4px 4px 16px;

        & .heroInput {
            all: unset;
            font-weight: 500;
            font-size: 20px;
            flex-grow: 1;
        }

        & .heroButton {
            all: unset;
            padding: 16px 24px 16px 24px;
            background-color: #262626;
            color: white;
            border-radius: 100px;
            cursor: pointer;
            font-weight: 700;
            font-size: 22px;
            flex-shrink: 0;
            flex-grow: 0;
        }
        & .heroButton:hover {
            background-color: #333333;
        }
    }

    & .heroInputParagraph {
        font-weight: 500;
        font-size: 18px;
        color: #525252;
    }
}
</style>
